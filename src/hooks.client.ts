import { dev } from '$app/environment';

// Theme management
let theme = localStorage.getItem('theme');

// If there's no theme set, default to 'light' or 'dark' based on system preference
if (!theme) {
	theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	localStorage.setItem('theme', theme);
}

// Apply the theme to the document's class
document.documentElement.classList.toggle('dark', theme === 'dark');

// Global error handler for uncaught client-side errors
window.onerror = function (msg, url, lineNo, columnNo, error) {
	const errorDetails = {
		message: msg,
		source: url,
		lineNumber: lineNo,
		columnNumber: columnNo,
		stack: error?.stack,
		userAgent: navigator.userAgent,
		timestamp: new Date().toISOString()
	};

	// Log to console in development
	if (dev) {
		console.error('Client Error:', errorDetails);
	}

	// You could send this to your server's error logging endpoint
	try {
		fetch('/api/log-error', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(errorDetails)
		}).catch(console.error); // Catch fetch errors silently
	} catch (e) {
		// Ignore sending errors to avoid infinite loops
	}

	return false; // Let the error propagate
};

// Handle unhandled promise rejections
window.onunhandledrejection = function (event) {
	const errorDetails = {
		message: event.reason?.message || 'Unhandled Promise Rejection',
		stack: event.reason?.stack,
		userAgent: navigator.userAgent,
		timestamp: new Date().toISOString()
	};

	// Log to console in development
	if (dev) {
		console.error('Unhandled Promise Rejection:', errorDetails);
	}

	// You could send this to your server's error logging endpoint
	try {
		fetch('/api/log-error', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(errorDetails)
		}).catch(console.error); // Catch fetch errors silently
	} catch (e) {
		// Ignore sending errors to avoid infinite loops
	}
};
