const data = [
	'https://cdn.midjourney.com/99300612-6aca-41c6-82ce-56924d42b1e9/0_3.png',
	'https://cdn.midjourney.com/1007cf2a-6ad6-41c0-b29b-7157b585b7b0/0_2.png',
	'https://cdn.midjourney.com/85a337ac-8c67-440c-9899-3735e2f600a7/0_2.png',
	'https://cdn.midjourney.com/69659516-0e8d-476b-9151-9869b9e4bbdb/0_1.png',
	'https://cdn.midjourney.com/b80c313d-45ef-4018-9169-5db86d86794c/0_0.png',
	'https://cdn.midjourney.com/bb747081-5feb-49ea-8c09-4ab25d1cbd6f/0_2.png',
	'https://cdn.midjourney.com/728f6561-5b39-4973-973e-a5099f830bd8/0_2.png',
	'https://cdn.midjourney.com/728f6561-5b39-4973-973e-a5099f830bd8/0_1.png',
	'https://cdn.midjourney.com/728f6561-5b39-4973-973e-a5099f830bd8/0_0.png',
	'https://cdn.midjourney.com/19c751de-eeaf-4e15-9031-af6949f23745/0_3.png',
	'https://cdn.midjourney.com/79cf22d7-05de-48b0-9a9f-24aaee31d377/0_3.png'
];

export const random = () => {
	return data[Math.floor(Math.random() * data.length)];
};

export default data;
