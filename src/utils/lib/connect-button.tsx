import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWalletContext } from "../context/walletContext";
import { useEffect, useRef } from "react";
import { WalletIcon } from "lucide-react";

interface ConnectWalletButtonProps {
	className?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ className }) => {
	const { updateData } = useWalletContext();
	const currentAddressRef = useRef<string | null>(null);
	const currentConnectedRef = useRef<boolean | null>(true);

	useEffect(() => {
		currentAddressRef.current = null; // Reset the ref on component mount
		currentConnectedRef.current = true; // Reset the ref on component mount
	}, []);

	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				mounted,
			}) => {
				const ready = mounted;
				const connected = ready && account && chain;

				// Update address only if it changes
				useEffect(() => {
					if (connected && account?.address && currentAddressRef.current !== account.address) {
						currentAddressRef.current = account.address;
						updateData({ connected: true, address: account.address });
					}
				}, [connected, account?.address, updateData]);

				// Track changes in account?.address and updateData
				useEffect(() => {
					if (account?.address && currentAddressRef.current !== account.address) {
						currentAddressRef.current = account.address;
						updateData({ connected: true, address: account.address });
					}
				}, [account?.address, updateData]);

				// Handle unsupported chain 
				useEffect(() => {
					if (chain?.unsupported && currentConnectedRef.current) {
						currentConnectedRef.current = false;
						updateData({ connected: false, address: '' });
						openChainModal(); // Show modal after reload
					}
				}, [chain?.unsupported, openChainModal, updateData]);

				// Handle wallet disconnection
				// useEffect(() => {
				// 	if (!connected && currentConnectedRef.current) {
				// 		currentConnectedRef.current = false;
				// 		updateData({ connected: false, address: '' });
				// 	}
				// }, [connected, updateData]);

				return (
					<div
						{...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<button
										onClick={openConnectModal}
										type="button"
										className={className}
									>
										<WalletIcon className="hidden md:block" />
										Connect Wallet
									</button>
								);
							}
							if (chain.unsupported) {
								return (
									<button
										onClick={() => {
											openChainModal();
										}}
										type="button"
										className="bg-[#1f083d] text-[red] px-4 py-3 rounded-lg"
									>
										Wrong network
									</button>
								);
							}
							return (
								<div className="flex items-center gap-4">
									<button
										onClick={openChainModal}
										style={{ display: "flex", alignItems: "center" }}
										type="button"
										className="gap-2 !hidden"
									>
										{chain.hasIcon && (
											<div
												style={{
													background: chain.iconBackground,
													width: 16,
													height: 16,
													borderRadius: 999,
													overflow: "hidden",
													marginRight: 4,
												}}
											>
												{chain.iconUrl && (
													<img
														alt={chain.name ?? "Chain icon"}
														src={chain.iconUrl}
														style={{ width: 16, height: 16 }}
													/>
												)}
											</div>
										)}
										{chain.name}
									</button>
									<button
										onClick={openAccountModal}
										type="button"
										className="bg-primary-bg hover:bg-[#fff533] hover:text-black hover:border-yellow-300 text-primary px-4 py-2 rounded-full border border-[#525252] font-semibold w-full justify-center flex flex-row gap-1"
									>
										<WalletIcon className="hidden md:block" />
										{account.displayName}
										{/* {account.displayBalance ? (
											<span className="text-gray-600"> ({account.displayBalance})</span>
										) : (
											""
										)} */}
									</button>

								</div>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
};