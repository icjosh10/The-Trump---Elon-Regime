const data = [
	'https://cdn.midjourney.com/5ffddceb-388a-4681-b3d0-ed2d76058aeb/0_2.png',
	'https://cdn.midjourney.com/25c3c9da-4de5-49a2-86bb-2639c1b6edf1/0_3.png',
	'https://cdn.midjourney.com/bc20ca88-d63f-4729-9f27-508328f81cb5/0_3.png'
];

export const random = () => {
	return data[Math.floor(Math.random() * data.length)];
};

// const randomized = () => {
// 	return data[Math.floor(Math.random() * data.length)];
// }

export default data;
