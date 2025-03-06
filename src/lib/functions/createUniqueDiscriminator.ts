import db from 'db';
//
export const randIntStr = () => `${Math.floor(Math.random() * 10)}`;
//
export async function createUniqueDiscriminator(username: string) {
	const createDiscriminator = () => `${randIntStr()}${randIntStr()}${randIntStr()}${randIntStr()}`;

	const discriminator = createDiscriminator();
	const user = await db.user.findFirst({
		where: { username: username }
	});

	if (!user) return discriminator;
	if (user.discriminator == discriminator) return createUniqueDiscriminator(username);

	return discriminator;
}
