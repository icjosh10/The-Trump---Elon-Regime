// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				_id: string;
				guest?: boolean;
				social?: {
					name: string;
					email: string;
					img: string;
					bio: string;
					banner_img: string;
					friends: string[];
					sentRequests: string[];
					receivedRequests: string[];
					followers: number;
					verified_famous: boolean;
				};
			};
		}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		google: {
			accounts: {
				id: {
					initialize: (config: {
						client_id: string;
						callback: (response: { credential: string }) => void;
					}) => void;
					renderButton: (
						element: HTMLElement,
						config: {
							theme?: 'outline' | 'filled_blue' | 'filled_black';
							size?: 'large' | 'medium' | 'small';
							width?: number | string;
						}
					) => void;
				};
			};
		};
	}
}

export {};
