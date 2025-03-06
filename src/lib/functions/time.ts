/**
 * Check if Daylight Saving Time is in effect for a given date in Central Time.
 * @param {Date} date - The date to check.
 * @returns {boolean} - True if DST is in effect; otherwise, false.
 */
export function isDST(date) {
	const start = new Date(date.getFullYear(), 2, 14); // Second Sunday in March
	const end = new Date(date.getFullYear(), 10, 7); // First Sunday in November

	// Adjust start to the correct date (second Sunday)
	start.setDate(14 - start.getDay());
	// Adjust end to the correct date (first Sunday)
	end.setDate(1 + ((7 - end.getDay()) % 7));

	return date >= start && date < end;
}

/**
 * Format the current date and time in CST/CDT.
 * @returns {string} - The formatted date and time string.
 */
export function getFormattedTime() {
	// Get the current time
	const now = new Date();

	// Adjust for CST or CDT based on whether DST is in effect
	const cstOffset = -6; // CST is UTC-6
	const cdtOffset = -5; // CDT is UTC-5
	const utcOffset = now.getTimezoneOffset() / 60; // Get current timezone offset in hours

	// Determine which offset to use
	const offset = isDST(now) ? cdtOffset : cstOffset;
	const adjustedDate = new Date(now.setHours(now.getHours() + offset + utcOffset));

	// Format the date and time
	const options = {
		weekday: 'long', // Full name of the day
		year: 'numeric', // Full numeric year
		month: 'long', // Full name of the month
		day: 'numeric', // Numeric day of the month
		hour: 'numeric', // Numeric hour
		minute: 'numeric', // Numeric minute
		hour12: true // 24-hour format; set to true for 12-hour format
	};

	// Format the date using toLocaleString
	return adjustedDate.toLocaleString('en-US', options) + ', ' + (isDST(now) ? 'CDT' : 'CST');
}
