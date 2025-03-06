import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET } from '$env/static/private';
import type { Provider } from '@auth/core/providers';
import { User, generateRandomUser } from '$models/User';
import { sequence } from '@sveltejs/kit/hooks';
import { ensureDbConnection } from './hooks.server.ts';

// Protected routes configuration
const protectedRoutes = ['/dashboard', '/profile', '/settings', '/api', '/courses'];

// Create a custom handle function for route protection
const customHandle = async ({ event, resolve }) => {
	const session = await event.locals.getSession();
	const path = event.url.pathname;

	// Check if the current path is protected
	const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

	if (isProtectedRoute && !session?.user) {
		// Redirect to signin page if trying to access protected route without auth
		return new Response(null, {
			status: 303,
			headers: { Location: '/signin?redirect=' + encodeURIComponent(path) }
		});
	}

	// Create guest user if no session exists
	if (!session?.user) {
		const guestData = generateRandomUser({
			guest: true
		});
		event.locals.user = {
			...guestData,
			guest: true
		};
	} else {
		event.locals.user = session.user;
	}

	return resolve(event);
};

export const auth = SvelteKitAuth({
	providers: [
		Google({
			clientId: AUTH_GOOGLE_ID,
			clientSecret: AUTH_GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: 'select_account'
				}
			}
		}) as Provider
	],
	pages: {
		signIn: '/signin',
		signOut: '/signout',
		error: '/signin'
	},
	callbacks: {
		async signIn({ user, account, profile }) {
			try {
				// Ensure database connection before any database operations
				await ensureDbConnection();

				const _id = undefined; // Let MongoDB generate this
				const userData = generateRandomUser({
					_id,
					name: user.name,
					email: user.email,
					img: user.image,
					guest: false,
					username: `user_${Date.now().toString(36)}`,
					hashed_password: undefined // OAuth users don't need passwords
				});

				// Find or create user in our database with all required fields
				const dbUser = await User.findOneAndUpdate(
					{ 'social.email': user.email },
					{
						$set: {
							username: userData.username,
							usernameUpdated: userData.usernameUpdated,
							guest: false,
							'social.name': userData.social.name,
							'social.email': userData.social.email,
							'social.img': userData.social.img,
							'social.bio': userData.social.bio,
							'social.banner_img': userData.social.banner_img,
							last_active: new Date()
						},
						$setOnInsert: {
							created: userData.created,
							premium: userData.premium,
							stats: userData.stats,
							subjects: userData.subjects,
							inventory: userData.inventory,
							'social.friends': [],
							'social.sentRequests': [],
							'social.receivedRequests': [],
							'social.followers': 0,
							'social.verified_famous': false
						}
					},
					{ upsert: true, new: true }
				);

				// Add MongoDB _id to the user object
				if (dbUser) {
					user._id = dbUser._id;
				}
				return true;
			} catch (error) {
				console.error('Error in signIn callback:', error);
				return false;
			}
		},
		async jwt({ token, user, trigger, session }) {
			if (trigger === 'signIn' && user) {
				token._id = user._id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user && token._id) {
				session.user._id = token._id;
				session.user.guest = false;
			}
			return session;
		}
	}
});

// Combine SvelteKitAuth handle with our custom handle
export const handle = sequence(auth.handle, customHandle);
