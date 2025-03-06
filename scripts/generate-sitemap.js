// sitemap.js
import { createWriteStream } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import pages from '../src/lib/data/page_aliases.js';

const SITE_URL = 'https://joshuavanyo.com';

generateSitemap();

export async function generateSitemap() {
	try {
		// Create a sitemap stream
		const smStream = new SitemapStream({ hostname: SITE_URL });

		// Add all pages from page_aliases
		pages.forEach((page) => {
			// Add main page
			smStream.write({
				url: page.name,
				changefreq: page.sitemap?.frequency || 'weekly',
				priority: page.sitemap?.priority || 0.5,
				lastmod: new Date().toISOString()
			});

			// Add aliases if they should be indexed
			if (page.sitemap?.includeAliases && Array.isArray(page.aliases)) {
				page.aliases.forEach((alias) => {
					smStream.write({
						url: alias,
						changefreq: page.sitemap?.frequency || 'weekly',
						priority: (page.sitemap?.priority || 0.5) * 0.9, // Slightly lower priority for aliases
						lastmod: new Date().toISOString()
					});
				});
			}
		});

		// Add any additional dynamic routes here if needed
		// For example, user profiles, blog posts, etc.

		// End the stream
		smStream.end();

		// Generate sitemap XML
		const sitemap = await streamToPromise(smStream);

		// Write to file
		const writeStream = createWriteStream('./static/sitemap.xml');
		writeStream.write(sitemap.toString());
		writeStream.end();

		console.log(' Sitemap generated successfully');
		return true;
	} catch (error) {
		console.error(' Error generating sitemap:', error);
		return false;
	}
}

// Function to validate sitemap
export async function validateSitemap() {
	try {
		const response = await fetch(`${SITE_URL}/sitemap.xml`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const text = await response.text();
		console.log(' Sitemap is valid and accessible');
		return true;
	} catch (error) {
		console.error(' Error validating sitemap:', error);
		return false;
	}
}
