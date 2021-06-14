const Suit = {
	spade: '♠',
	club: '♣',
	diamond: '♦',
	heart: '♥'
};

const suitList = [
	suit.spade,
	suit.club,
	suit.diamond,
	suit.heart
]

const cardlist = [
	{rank:2, label: '2'},
	{rank:3, label: '3'},
	{rank:4, label: '4'},
	{rank:5, label: '5'},
	{rank:6, label: '6'},
	{rank:7, label: '7'},
	{rank:8, label: '8'},
	{rank:9, label: '9'},
	{rank:10, label: '10'},
	{rank:11, label: 'J'},
	{rank:12, label: 'Q'},
	{rank:13, label: 'K'},
	{rank:14, label: 'A'}
];

const deckBase =
	suitList
		.map()
