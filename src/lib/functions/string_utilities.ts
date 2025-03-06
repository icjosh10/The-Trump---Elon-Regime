function trimMessage(message, wordLimit) {
	const words = message.split(' ');
	if (words.length > wordLimit) {
		return words.slice(0, wordLimit).join(' ') + '...';
	}
	return message;
}

export { trimMessage };
export default trimMessage;
