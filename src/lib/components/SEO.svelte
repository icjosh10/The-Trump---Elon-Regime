<script lang="ts">
	let { data } = $props();
	const {
		title = 'Joshuavanyo.com - Learning through gaming. - Joshua Vanyo',
		description = 'Learning through gaming. - Joshua Vanyo',
		type = 'article',
		image = '/images/logo.webp',
		keywords = 'Joshua, Vanyo, education, gaming, learning, trivia, quiz, games, knowledge, GamEDU, KungFu Gaming',
		author = 'Joshua Vanyo',
		publishedTime = new Date().toISOString(),
		modifiedTime = new Date().toISOString()
	} = data;

	import { page } from '$app/stores';
	import { generateSchema } from '$lib/data/application_LD.js';

	let schema = $state(JSON.stringify(generateSchema(data), null, 2));
	let url = $state($page.url.href);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content={author} />

	<!-- Basic Meta -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<meta name="theme-color" content="#00FFFF" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)" />
	<meta name="color-scheme" content="dark light" />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

	<!-- Icons -->
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="canonical" href={url} />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
	<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="GamEDU" />
	<meta name="application-name" content="GamEDU" />

	<!-- Open Graph / Facebook -->
	<meta property="og:site_name" content="GamEDU" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:alt" content={description} />
	<meta property="article:published_time" content={publishedTime} />
	<meta property="article:modified_time" content={modifiedTime} />
	<meta property="article:author" content={author} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@GamEDU" />
	<meta name="twitter:creator" content="@GamEDU" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={description} />

	<!-- JSON-LD -->
	{@html `<script type="application/ld+json">
		${schema}
	</script>`}

	<!-- Google / Search Engine Tags -->
	<meta name="google-site-verification" content="S7kRD4XIERPPTEOyFnHCXtT_1yWt_xziZcztts57UI8" />
</svelte:head>
