import GPT3TokenizerImport from 'gpt3-tokenizer';

const GPT3Tokenizer =
	typeof GPT3TokenizerImport === 'function' ? GPT3TokenizerImport : GPT3TokenizerImport.default;

const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });

export function getTokens(input) {
	const tokens = tokenizer.encode(input);
	console.log('Request:', input);
	console.log('Token Count for this request:', tokens.text.length);
	return tokens.text.length;
}
