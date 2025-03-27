import { Route, Routes } from "react-router-dom";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import '@rainbow-me/rainbowkit/styles.css';

import Footer from "./components/footer";
import Nav from "./components/nav";
import Home from "./pages/home";
import LeaderBoard from "./pages/leaderBoard";
import { useWalletContext } from "./utils/context/walletContext";

function App() {

	const { isDark } = useWalletContext();

	return (
		<RainbowKitProvider
			theme={isDark
				? darkTheme({
					accentColor: "#fff533",
					accentColorForeground: "#070707",
					overlayBlur: 'small',
				})
				: lightTheme({
					accentColor: "#fff533",
					accentColorForeground: "#070707",
					overlayBlur: 'small',
				})}
		>
			<div className="bg-black">
				<Nav />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/leaderboard' element={<LeaderBoard />} />
				</Routes>
				<Footer />
			</div>
		</RainbowKitProvider>
	);
}

export default App;
