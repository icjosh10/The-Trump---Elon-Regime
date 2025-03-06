const data = [
	// Bull
	'https://cdn.midjourney.com/c8c259cb-301d-41bc-b65f-82c437899284/0_0.png',
	'https://cdn.midjourney.com/c8c259cb-301d-41bc-b65f-82c437899284/0_1.png',
	'https://cdn.midjourney.com/c8c259cb-301d-41bc-b65f-82c437899284/0_2.png',
	'https://cdn.midjourney.com/c8c259cb-301d-41bc-b65f-82c437899284/0_3.png',
	// Elephant
	'https://cdn.midjourney.com/36dad62e-5637-40ca-bdd9-371a2520ef88/0_1.png'
];

export const random = () => {
	return data[Math.floor(Math.random() * data.length)];
};

export default data;
