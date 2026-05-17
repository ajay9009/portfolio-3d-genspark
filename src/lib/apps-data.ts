export type AppData = {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    features: string[];
    image: string;
    screenshots: string[];
    playStoreUrl: string;
    color: string;
};

export const APPS: AppData[] = [
    {
        slug: 'rewardly',
        name: 'Rewardly',
        tagline: 'Earn rewards effortlessly',
        description: 'Rewardly lets users complete simple tasks and earn redeemable rewards. Built with Java + Firebase, scaled to thousands of installs.',
        features: ['Daily tasks & spins', 'Real cash rewards', 'Firebase auth', 'Push notifications', 'Referral system'],
        image: '/apps/rewardly.png',
        screenshots: ['/apps/rewardly-ss1.png', '/apps/rewardly-ss2.png'],
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.app.rewardly',
        color: 'from-violet-600 to-blue-500',
    },
    {
        slug: 'rewardplay',
        name: 'Rewardplay',
        tagline: 'Play. Earn. Repeat.',
        description: 'Gamified reward platform combining mini-games with real payouts. Optimized for low-end devices.',
        features: ['Mini-games library', 'Leaderboards', 'UPI payouts', 'Anti-fraud detection', 'Offline cache'],
        image: '/apps/rewardplay.png',
        screenshots: ['/screenshots/rewardplay-1.png', '/screenshots/rewardplay-2.png'],
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.app.rewardplay',
        color: 'from-pink-500 to-rose-600',
    },
    {
        slug: 'coinzoo',
        name: 'CoinZoo',
        tagline: 'Track crypto, simplified',
        description: 'Real-time crypto tracker with portfolio analytics. RESTful APIs, MVVM architecture.',
        features: ['Live prices', 'Portfolio tracking', 'Price alerts', 'Watchlist', 'Dark mode'],
        image: '/apps/coinzoo.png',
        screenshots: ['/screenshots/coinzoo-1.png', '/screenshots/coinzoo-2.png'],
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.app.coinzoo',
        color: 'from-emerald-400 to-teal-600',
    },
    {
        slug: 'coinova',
        name: 'Coinova',
        tagline: 'Your crypto companion',
        description: 'News, charts, and signals for crypto enthusiasts. Built for performance.',
        features: ['Market news', 'Candlestick charts', 'Signal alerts', 'Multi-currency', 'Widgets'],
        image: '/apps/coinova.png',
        screenshots: ['/screenshots/coinova-1.png', '/screenshots/coinova-2.png'],
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.app.coinova',
        color: 'from-violet-500 to-purple-700',
    },
    {
        slug: 'coinpe',
        name: 'CoinPe',
        tagline: 'Crypto payments made easy',
        description: 'Crypto wallet & payments app with secure key storage and biometric unlock.',
        features: ['Secure wallet', 'Biometric unlock', 'UPI bridge', 'Transaction history', 'QR pay'],
        image: '/apps/coinpe.png',
        screenshots: ['/screenshots/coinpe-1.png', '/screenshots/coinpe-2.png'],
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.app.coinpe',
        color: 'from-blue-500 to-cyan-600',
    },
];
