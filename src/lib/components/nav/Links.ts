interface NavItem {
	name: string;
	icon: string;
	link: string;
	badge?: number;
}

const LinkItems: NavItem[] = [
	{ name: 'Trivia', icon: 'ph:game-controller-fill', link: '/trivia/train' },
	{ name: 'Leaderboards', icon: 'iconoir:leaderboard-star', link: '/leaderboards' },
	{ name: 'Shop', icon: 'iconoir:shop', link: '/shop' },
	{ name: 'About Me', icon: 'ph:info', link: '/aboutme' },
	{ name: 'Friends', icon: 'ph:users', link: '/friends/suggestions' },
	{ name: 'Contact Us', icon: 'ph:envelope', link: '/contactus' }
];

export default LinkItems;
export { LinkItems };
