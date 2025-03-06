export function generateSchema({ url, title, description, image, type }) {
	return {
		'@context': 'https://schema.org/',
		'@id': url,
		'@type': type,
		name: title,
		description: description,
		url: url,
		image: {
			'@type': 'ImageObject',
			url: image,
			width: 800,
			height: 600
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url
		},
		author: {
			'@type': 'Person',
			name: 'Joshua Vanyo',
			sameAs: ['https://www.linkedin.com/in/joshuavanyo/', 'https://twitter.com/joshuavanyo']
		},
		publisher: {
			'@type': 'Organization',
			name: 'GamEDU',
			logo: {
				'@type': 'ImageObject',
				url: '/images/logo.webp'
			},
			sameAs: 'https://www.GamEDU.com'
		},
		datePublished: '2023-10-20',
		dateModified: '2023-10-25',
		headline: title,
		inLanguage: 'en',
		keywords: 'gaming education, online gaming, educational games',
		copyrightHolder: {
			'@type': 'Organization',
			name: 'GamEDU'
		},
		copyrightYear: '2023',
		genre: 'Educational Gaming',
		isAccessibleForFree: 'True',
		isFamilyFriendly: 'True'
	};
}
