import React, { useState } from 'react';
import axios from 'axios';
import { Check, SendHorizonalIcon } from 'lucide-react';

import Watermark from '../assets/img/watermark.svg'
import Youtube_icon from '../assets/img/youtube-icon.png'
import X_icon from '../assets/img/x-icon.png'
import Linkedin_icon from '../assets/img/linkedin-icon.png'
import Instagram_icon from '../assets/img/instagram-icon.png'
import Facebook_icon from '../assets/img/facebook-icon.png'
import Reddit_icon from '../assets/img/reddit-icon.png'
import Discord_icon from '../assets/img/discord-icon.png'
import Telegram_icon from '../assets/img/telegram-icon.png'

const Footer: React.FC = () => {

    const [isAccepted, setIsAccepted] = useState(false);
    const [email, setEmail] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const handleAcceptTerms = () => {
        setIsAccepted(!isAccepted);
    }

    const handleInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
    };

    function isValidEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleSubmit = async () => {
        if (email === '' || !isValidEmail(email)) {
            setErrMsg('Please enter a valid email address')
            return
        }
        if (!isAccepted) {
            setErrMsg('Please tick the box to accept our conditions');
            return
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('token', import.meta.env.VITE_AUTH_TOKEN);

        try {
            const response = await axios.post(import.meta.env.VITE_API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                setEmail('')
                setIsAccepted(false)
                setErrMsg('Check your email to confirm subscription');
            }
        } catch (error) {
            console.error('Error subscription Email:', error);
        }
    }

    return (
        <div className='bg-black text-white z-[0] scrollbar-hide'>
            <div className='w-full 2xl:w-[1280px] 2xl:mx-auto md:px-8 2xl:px-0 px-4'>
                <div className='md:py-[80px] py-[30px] flex lg:flex-row flex-col lg:gap-[8vw] gap-8 w-full'>
                    <div className='flex flex-col gap-16 lg:w-[40%] md:w-[80%] w-full'>
                        <div className='space-y-6'>
                            <div className='text-[40px] font-bold'>Reclaim Power</div>
                            <div className='text-[#A3A3A3]'>Your phone. Your data. Your rewards. Join the first private, user-owned mobile network that pays you back.</div>
                            <div className='flex md:flex-row flex-col gap-6'>
                                <a
                                    className='px-6 py-3 rounded-full w-max bg-[#FFF533] text-black font-semibold cursor-pointer hover:bg-white'
                                    href="https://worldmobile.io/phone-plans" target="_blank" rel="noopener noreferrer"
                                >
                                    Shop phone plans
                                </a>
                                <a
                                    className='px-6 py-3 rounded-full w-max border border-[#737373] text-white font-semibold cursor-pointer hover:bg-[#171717]'
                                    href="https://worldmobile.io/airnodes" target="_blank" rel="noopener noreferrer"
                                >
                                    Build the network
                                </a>
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <div className='text-[18px]'>Stay Ahead. Stay Connected.</div>
                            <div className='text-[#A3A3A3]'>Be the first to hear about exclusive offers and the latest updates from World Mobile.</div>
                            <div className='flex flex-row items-center justify-between border border-[#525252] rounded-md max-w-[380px]'>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => handleInputAmount(e)}
                                    placeholder="Enter your email here"
                                    className="w-full placeholder:text-[#737373] border-none bg-inherit focus:ring-0 outline-none px-3 py-3 rounded-md"
                                />
                                <div
                                    onClick={handleSubmit}
                                    className='bg-[#171717] border-l border-l-[#525252] flex items-center justify-center p-3 rounded-r-md cursor-pointer'
                                >
                                    <SendHorizonalIcon />
                                </div>
                            </div>
                            {errMsg &&
                                <div className={`text-sm ${errMsg === 'Check your email to confirm subscription' ? 'text-[#4BB543]' : 'text-white'}`}>{errMsg}</div>
                            }
                            <div className='flex flex-row gap-2'>
                                <div className={`w-5 h-5 rounded-md cursor-pointer flex justify-center items-center text-black ${isAccepted ? 'bg-white' : 'hover:bg-[#171717] hover:text-[#171717] border border-[#525252]'}`} onClick={handleAcceptTerms}><Check size={15} /></div>
                                <div className='text-[#A3A3A3]'>
                                    I understand and consent to the following Privacy Policy
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between lg:w-[50%] w-full space-y-12'>
                        <div className='grid grid-cols-2 md:grid-cols-3 justify-between md:mt-12 mt-6'>
                            <div className='flex flex-col gap-6'>
                                <a
                                    className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                    href="https://worldmobile.io/phone-plans" target="_blank" rel="noopener noreferrer"
                                >
                                    Phone plans
                                </a>
                                <a
                                    className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                    href="https://worldmobile.io/travel-esims" target="_blank" rel="noopener noreferrer"
                                >
                                    Travel eSIMs
                                </a>
                                <a
                                    className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                    href="https://worldmobile.io/airnodes" target="_blank" rel="noopener noreferrer"
                                >
                                    Airnodes
                                </a>
                                <a
                                    className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                    href="https://worldmobile.io/the-chain" target="_blank" rel="noopener noreferrer"
                                >
                                    The Chain
                                </a>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <a
                                    className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                    href="https://worldmobile.io/about" target="_blank" rel="noopener noreferrer"
                                >
                                    About us
                                </a>
                                <a
                                    className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                    href="https://worldmobile.io/help" target="_blank" rel="noopener noreferrer"
                                >
                                    Help
                                </a>
                                <a
                                    className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                    href="https://careers.worldmobile.io/?_gl=1*1b03pqo*_ga*NzU2NzE2NjE0LjE3NDEzNTg4NjE.*_ga_4H9G3W8ZW7*MTc0MjkwNjQwMC4yMS4xLjE3NDI5MDcxMjkuMC4wLjA." target="_blank" rel="noopener noreferrer"
                                >
                                    Careers
                                </a>
                            </div>
                            <div className='flex md:flex-col flex-row gap-6 md:mt-0 mt-6'>
                                <div className='flex flex-col gap-6'>
                                    <a
                                        className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                        href="https://worldmobile.io/privacy" target="_blank" rel="noopener noreferrer"
                                    >
                                        Privacy
                                    </a>
                                    <a
                                        className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                        href="https://worldmobile.io/terms-and-conditions" target="_blank" rel="noopener noreferrer"
                                    >
                                        Terms
                                    </a>
                                </div>
                                <div className='md:flex flex-col gap-6 hidden'>
                                    <a
                                        className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                        href="https://worldmobile.io/cookies" target="_blank" rel="noopener noreferrer"
                                    >
                                        Cookies
                                    </a>
                                    <a
                                        className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                        href="https://worldmobile.io/#" target="_blank" rel="noopener noreferrer"
                                    >
                                        Preferences
                                    </a>
                                </div>
                            </div>
                            <div className='flex flex-col gap-6 md:hidden mt-6'>
                                <a
                                    className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                    href="https://worldmobile.io/cookies" target="_blank" rel="noopener noreferrer"
                                >
                                    Cookies
                                </a>
                                <a
                                    className='font-[600] cursor-pointer hover:text-[#A3A3A3]'
                                    href="https://worldmobile.io/#" target="_blank" rel="noopener noreferrer"
                                >
                                    Preferences
                                </a>
                            </div>
                        </div>
                        <div className='space-y-6'>
                            <div className='text-[18px] font-semibold'>Follow us</div>
                            <div className='flex flex-row md:gap-6 justify-between md:justify-start'>
                                <a href="https://www.youtube.com/channel/UCw8cjqZEfYIs1I-bMocfXAg" target="_blank" rel="noopener noreferrer">
                                    <img src={Youtube_icon} alt='social-icon' />
                                </a>
                                <a href="https://twitter.com/WorldMobileTeam/" target="_blank" rel="noopener noreferrer">
                                    <img src={X_icon} alt='social-icon' />
                                </a>
                                <a href="https://www.linkedin.com/company/worldmobilegroup/" target="_blank" rel="noopener noreferrer">
                                    <img src={Linkedin_icon} alt='social-icon' />
                                </a>
                                <a href="https://www.instagram.com/WorldMobileTeam/" target="_blank" rel="noopener noreferrer">
                                    <img src={Instagram_icon} alt='social-icon' />
                                </a>
                                <a href="https://www.facebook.com/WorldMobileTeam/" target="_blank" rel="noopener noreferrer">
                                    <img src={Facebook_icon} alt='social-icon' />
                                </a>
                                <a href="https://www.reddit.com/r/worldmobile/" target="_blank" rel="noopener noreferrer">
                                    <img src={Reddit_icon} alt='social-icon' />
                                </a>
                                <a href="https://discord.gg/worldmobile" target="_blank" rel="noopener noreferrer">
                                    <img src={Discord_icon} alt='social-icon' />
                                </a>
                                <a href="https://t.me/WorldMobileTeam" target="_blank" rel="noopener noreferrer">
                                    <img src={Telegram_icon} alt='social-icon' />
                                </a>
                            </div>
                            <div className='text-[#A3A3A3]'>© 2025 World Mobile All rights reserved.</div>
                        </div>
                    </div>
                </div>
                <div className='py-[40px]'>
                    <img src={Watermark} alt='watermark' />
                </div>
            </div>
        </div>
    );
};

export default Footer;
