import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Web3 from "web3";

import tokenABI from '../utils/abis/token.json';

import Logo_white from "../assets/img/logo-white.svg";
import Logo_black from "../assets/img/logo-black.svg";
import { ConnectWalletButton } from "../utils/lib/connect-button";
import { MoonIcon, SunIcon, WalletIcon } from "lucide-react";
import { useWalletContext } from "../utils/context/walletContext";
import { shortNumber } from "../pages/leaderBoard";

const Nav: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [balance, setBalance] = useState<number>(0.00);
	const location = useLocation();
	// Function to check if the link is active
	const isActive = (path: string) => location.pathname === path;
	const { data, updateDarkMode } = useWalletContext();

	useEffect(() => {
		const html = document.documentElement;
		if (isDarkMode) {
			html.classList.add('dark');
			html.classList.remove('light');
		} else {
			html.classList.remove('dark');
			html.classList.add('light');
		}
	}, [isDarkMode]);

	const fetchBalance = async () => {
		const web3 = new Web3(window.ethereum);
		const tokenContractAddress = import.meta.env.VITE_TOKEN_CA;
		const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

		const tokenBalance: any = await tokenContract.methods.balanceOf(data.address).call();
		const formattedBalance = web3.utils.fromWei(tokenBalance, "ether"); // Convert from Wei to Ether for readability
		setBalance(Number(formattedBalance));
	}

	useEffect(() => {
		fetchBalance();
	}, [data])

	const handleDark = () => {
		setIsDarkMode(!isDarkMode);
		updateDarkMode(!isDarkMode);
	}

	return (
		<header className="flex flex-col fixed top-0 z-[50] text-primary bg-primary-bg w-full">
			{/* Left side: Logo and Company Name */}
			<div className="border-b border-b-light-border">
				<div className="flex flex-row justify-between items-center 2xl:w-[1280px] 2xl:mx-auto md:px-8 2xl:px-0 px-4 h-[60px]">
					<Link to="/">
						<div className="flex flex-row gap-3 items-center">
							{
								isDarkMode ?
									<img src={Logo_white} alt="Logo" className="w-[40px]" /> :
									<img src={Logo_black} alt="Logo" className="w-[40px]" />
							}
							<div className="text-primary font-bold text-2xl">World Mobile</div>
						</div>
					</Link>
					{/* Right side: Mobile Navigation */}
					<div className="md:hidden flex items-center space-x-2">
						<div className="relative">
							{/* <ConnectWalletButton /> */}
						</div>
						<button
							className=""
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>

							{isMenuOpen ?
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg> :
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 6h16M4 12h16m-7 6h7"
									/>
								</svg>
							}
						</button>
					</div>
				</div>
			</div>

			{/* Right side: Desktop Navigation */}
			<div className="justify-end h-[60px] 2xl:w-[1280px] 2xl:mx-auto md:px-8 2xl:px-0 px-4 hidden md:flex">
				<nav className="flex items-center space-x-8 font-[400]">
					<Link to="/" className={`hover:border-b hover:border-b-primary text-sm ${isActive("/") ? "border-b border-b-primary" : ""

						}`}>
						EVM Staking
					</Link>
					<Link to="/leaderboard" className={`hover:border-b hover:border-b-primary text-sm ${isActive("/leaderboard") ? "border-b border-b-primary" : ""

						}`}>
						Leaderboard
					</Link>
					<div
						onClick={handleDark}
						className="border border-[#525252] rounded-full p-2 cursor-pointer"
					>
						{isDarkMode ? <MoonIcon /> : <SunIcon />}
					</div>
					<div className="relative">
						<ConnectWalletButton className="hover:bg-[#fff533] hover:text-black hover:border-yellow-300 px-4 py-2 rounded-full border border-[#525252] font-semibold flex flex-row gap-1" />
					</div>
				</nav>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="absolute top-[60px] left-0 w-full bg-primary-bg z-50 h-[calc(100vh-60px)] flex flex-col justify-between py-8 px-4">
					<nav className="flex flex-col space-y-6 pb-8">
						<div className="text-xl">Stake WMTx</div>
						<Link
							to="/"
							className={`text-xl hover:text-gray-300 pl-4 ${isActive("/") ? "" : ""
								}`}
							onClick={() => setIsMenuOpen(false)}
						>
							Stake
						</Link>
						<Link
							to="/leaderboard"
							className={`text-xl hover:text-gray-300 pl-4 ${isActive("/leaderboard") ? "" : ""
								}`}
							onClick={() => setIsMenuOpen(false)}
						>
							Leaderboard
						</Link>
						<div className={`flex flex-row justify-between items-center px-8 h-[64px] rounded-xl !mt-12 bg-card-bg`}>
							<div className="flex flex-row space-x-4">
								{isDarkMode ? <MoonIcon /> : <SunIcon />}
								<div>Dark mode ?</div>
							</div>
							<button
								onClick={handleDark}
								className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-[#fff533]' : 'bg-gray-400'
									}`}
							>
								<span
									className={`absolute top-[2px] left-0 w-5 h-5 rounded-full bg-black transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'
										}`}
								></span>
							</button>
						</div>
					</nav>
					<div className="w-full flex flex-col justify-center gap-8">
						<div className={`px-8 py-4 h-[76px] rounded-xl  flex flex-row gap-4 bg-card-bg`}>
							<WalletIcon />
							<div className="flex flex-col">
								<div className=" text-lg font-bold">{shortNumber(balance)} WMTx</div>
								<div className="text-sm text-light">Wallet balance</div>
							</div>
						</div>
						<ConnectWalletButton className="bg-[#fff533] hover: text-black px-4 py-4 rounded-full font-semibold flex flex-row gap-1 w-full justify-center" />
					</div>
				</div>
			)}
		</header>
	);
};

export default Nav;
