const data = [
	'https://cdn.midjourney.com/dadda2eb-37e7-4555-9a67-3a819a9300e7/0_2.png',
	'https://cdn.midjourney.com/1f7909f6-e88b-46e0-80f1-d619f8e2be77/0_0.png',
	'https://cdn.midjourney.com/fb5637ce-f2ba-4b8b-978b-ddf628d0aa1e/0_1.png,'
];

export const random = () => {
	return data[Math.floor(Math.random() * data.length)];
};

export default data;
