import { building } from '$app/environment';

export const handle = async ({ event, resolve }) => {
	if (building) return resolve(event); // Skip if building
	return await resolve(event);
};
