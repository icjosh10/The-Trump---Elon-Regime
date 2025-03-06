import { redirect } from '@sveltejs/kit';

export const data = [
	{
		name: '/trivia/train',
		aliases: ['/home', '/index'],
		seo: {
			title: 'Play Games - KungFu Gaming',
			description:
				'Play educational gaming trivia and enhance your gaming knowledge with KungFu Gaming.',
			keywords:
				'Gaming Trivia, KungFu Gaming, Gaming Knowledge, Gaming Community, Educational Games'
		},
		sitemap: {
			frequency: 'daily',
			priority: 1.0,
			includeAliases: false // Don't index aliases for homepage
		}
	},
	{
		name: '/vocab',
		aliases: ['/rooms', '/tests', '/quiz'],
		seo: {
			title: 'Gaming Vocabulary Games - KungFu Gaming',
			description:
				'Master gaming terminology through interactive quizzes and trivia games. Learn while having fun!',
			keywords: 'Gaming Vocabulary, Gaming Terms, Gaming Quiz, Gaming Trivia, Educational Gaming'
		},
		sitemap: {
			frequency: 'weekly',
			priority: 0.8,
			includeAliases: true
		}
	},
	{
		name: '/leaderboards',
		aliases: ['/leaderboard', '/rankings', '/top-players'],
		seo: {
			title: 'Gaming Leaderboard - KungFu Gaming',
			description:
				'See the top performers in gaming knowledge. Compete with other players and climb the rankings.',
			keywords: 'Gaming Leaderboard, Top Gamers, Gaming Rankings, Gaming Competition'
		},
		sitemap: {
			frequency: 'weekly',
			priority: 0.8,
			includeAliases: true
		}
	},
	{
		name: '/signup',
		aliases: ['/register', '/sign-up'],
		seo: {
			title: 'Sign Up - KungFu Gaming',
			description:
				'Join the KungFu Gaming community. Create your account and start your gaming education journey today.',
			keywords: 'Gaming Account, Register Gaming, KungFu Gaming Signup, Gaming Community Join'
		},
		sitemap: {
			frequency: 'monthly',
			priority: 0.7,
			includeAliases: false // Don't index auth pages aliases
		}
	},
	{
		name: '/signin',
		aliases: ['/login', '/sign-in'],
		seo: {
			title: 'Sign In - KungFu Gaming',
			description: 'Sign in to your KungFu Gaming account. Continue your gaming education journey.',
			keywords: 'Gaming Login, KungFu Gaming Signin, Gaming Account Access'
		},
		sitemap: {
			frequency: 'monthly',
			priority: 0.7,
			includeAliases: false
		}
	},
	{
		name: '/signout',
		aliases: ['/sign-out', '/logout'],
		seo: {
			title: 'Sign Out - KungFu Gaming',
			description: 'Sign out from your KungFu Gaming account.',
			keywords: 'Gaming Logout, KungFu Gaming Signout'
		},
		sitemap: {
			frequency: 'never', // Don't index logout page
			priority: 0.1,
			includeAliases: false
		}
	},
	{
		name: '/account',
		aliases: ['/setting', '/settings', '/accounts', '/preferences', '/data', '/info'],
		seo: {
			title: 'Account Settings - KungFu Gaming',
			description:
				'Manage your KungFu Gaming account settings, preferences, and profile information.',
			keywords:
				'Gaming Profile Settings, Account Management, Gaming Preferences, Profile Customization'
		},
		sitemap: {
			frequency: 'monthly',
			priority: 0.6,
			includeAliases: false // Don't index settings aliases
		}
	},
	{
		name: '/friends',
		aliases: ['/social', '/socials'],
		seo: {
			title: 'Gaming Friends - KungFu Gaming',
			description:
				'Connect with fellow gamers, make friends, and share your gaming knowledge on KungFu Gaming.',
			keywords: 'Gaming Friends, Gaming Community, Gamer Network, Gaming Social'
		},
		sitemap: {
			frequency: 'weekly',
			priority: 0.8,
			includeAliases: true
		}
	},
	{
		name: '/user',
		aliases: ['/profile', '/my-profile'],
		seo: {
			title: 'User Profile - KungFu Gaming',
			description:
				'View and customize your KungFu Gaming profile. Track your progress and achievements.',
			keywords: 'Gaming Profile, Gamer Stats, Gaming Achievements, Gaming Progress'
		},
		sitemap: {
			frequency: 'weekly',
			priority: 0.8,
			includeAliases: false
		}
	},
	{
		name: '/leaderboard',
		aliases: ['/rankings', '/top-players'],
		seo: {
			title: 'Gaming Leaderboard - KungFu Gaming',
			description:
				'See the top performers in gaming knowledge. Compete with other players and climb the rankings.',
			keywords: 'Gaming Leaderboard, Top Gamers, Gaming Rankings, Gaming Competition'
		},
		sitemap: {
			frequency: 'hourly',
			priority: 0.9,
			includeAliases: true
		}
	}
];

/**
 * Checks if the current path is an alias and redirects to the main path if needed
 * @param {string} path_name - The current path to check
 * @returns {void}
 */
export const aliasChecker = (path_name) => {
	for (const page of data) {
		if (page.aliases?.includes(path_name)) {
			redirect(307, page.name);
		}
	}
};

export default data;
