import React, { useState, useEffect } from 'react';

import Telegram_icon from '../assets/img/telegram.png';
import Discord_icon from '../assets/img/discord.png';
import X_icon from '../assets/img/x.png';
import Reddit_icon from '../assets/img/reddit.png';
import WMTxLogo from '../assets/img/logo-white.svg';


const Footer: React.FC = () => {
    const footerData = {
        links: [
            {
                label: 'COMPANY',
                items: [
                    { label: 'World Mobile', link: 'https://worldmobiletoken.com/' },
                    { label: 'Partnerships', link: 'https://worldmobiletoken.com/partnerships' },
                    { label: 'ENNFT Policy ID', link: 'https://cexplorer.io/policy/b97859c71e4e73af3ae83c30a3172c434c43041f6ff19c297fb76094' },
                    { label: 'Contact Us', link: 'https://worldmobiletoken.com/contact' },
                ],
            },
            {
                label: 'COMMUNITY',
                items: [
                    { label: 'Telegram', link: 'https://bit.ly/wmjoinus' },
                    { label: 'Twitter', link: 'https://x.com/wmtoken' },
                    { label: 'Discord', link: 'https://discord.gg/worldmobile' },
                    { label: 'Reddit', link: 'https://www.reddit.com/r/WorldMobileToken/' },
                ],
            },
            {
                label: 'TOKENOMICS',
                items: [
                    { label: 'WhitePaper', link: 'https://worldmobiletoken.com/WhitePaper.pdf' },
                    { label: 'TokenPaper', link: 'https://worldmobiletoken.com/TokenPaper.pdf' },
                    { label: 'Early Rewards 1', link: 'https://worldmobiletoken.com/EarlyRewards.pdf' },
                ],
            },
            {
                label: 'SHOP AND LEARN',
                items: [
                    { label: 'Merch', link: 'https://merch.worldmobile.io/' },
                    { label: 'Blog', link: 'https://worldmobiletoken.com/blog' },
                    { label: 'FAQ', link: 'https://faq.worldmobiletoken.com' },
                ],
            },
            {
                label: 'OTHERS',
                items: [
                    { label: 'Terms and Conditions', link: 'https://worldmobiletoken.com/terms-and-conditions' },
                    { label: 'Privacy Policy', link: 'https://worldmobiletoken.com/privacy-policy' },
                    { label: 'Cookie Policy', link: 'https://worldmobiletoken.com/cookie-policy' },
                ],
            },
        ],
        socials: [
            { icon: Telegram_icon, link: 'https://t.me/WorldMobileTeam' },
            { icon: Discord_icon, link: 'https://discord.gg/worldmobile' },
            { icon: X_icon, link: 'https://x.com/wmtoken' },
            { icon: Reddit_icon, link: '' },
        ],
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Function to check if the screen is mobile size
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Set initial state
        handleResize();

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <footer className="text-gray-200 w-full bg-black">

            {/* Logo and Tagline */}
            <div className="md:w-[80%] pt-3 flex-col md:flex-row gap-5 text-white mx-auto text-center w-full flex justify-center items-center border-b border-gray-500 pb-6">
                <img src={WMTxLogo} alt='logo' width={50} />
                <p className='md:text-3xl text-lg'>Powering the future of connectivity</p>
            </div>

            {/* Terms Section */}
            {!isMobile && (
                <div className="mt-8 flex justify-center space-x-4 w-full">
                    {footerData.links
                        .find((section) => section.label === 'OTHERS')
                        ?.items.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline hover:text-gray-400"
                            >
                                {item.label}
                            </a>
                        ))}
                </div>
            )}

            {/* Terms for Mobile */}
            <div className="mt-4 text-center text-sm pb-6">
                © 2025 World Mobile Token (BVI) Ltd All rights reserved
            </div>
        </footer>
    );
};

export default Footer;
