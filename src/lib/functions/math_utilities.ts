// Round to a certain number of decimal places without changing to string
export const round = (num, precision = 0) => {
	const factor = Math.pow(10, precision);
	return Math.round(num * factor) / factor;
};
export const isPositiveInt = (value) => {
	// Checks if string value is a real integer
	// Default MDN methods use coerced values and won't work well with URL numbers
	// These work great so far
	return !/^\d+$/.test(value);
};

export const isInt = (value) => {
	return !/^-\d+$/.test(value);
};

//
export function formatBytes(bytes, decimals = 2) {
	if (!+bytes) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
