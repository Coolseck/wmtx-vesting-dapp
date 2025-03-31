import React, { useEffect, useState } from "react";
import Web3 from "web3";

import contractABI from '../utils/abis/stakingContract.json';
import tokenABI from '../utils/abis/token.json';

import { useWalletContext } from "../utils/context/walletContext";

import { ConnectWalletButton } from "../utils/lib/connect-button";
import InfoCard from "../components/InfoCard";
import Modal from "../components/Modal";
import Alert from "../components/Alert";
import { shortNumber } from "../pages/leaderBoard";
import { CopyIcon, InfoIcon } from "lucide-react";

import Tier_dark_img from '../assets/img/tier-dark-icon.png'
import Tier_light_img from '../assets/img/tier-light-icon.png'
import PopoverModal from "../components/PopoverModal";

const Home: React.FC = () => {

    const [balance, setBalance] = useState<number | string>("-");
    // const [amount, setAmount] = useState<any>("");
    const [stakeAmount, setStakeAmount] = useState<number | string>("-");
    const [reward, setReward] = useState<number | string>("-");
    const [stakingDuration, setStakingDuration] = useState<number | string>("-");
    const [copied, setCopied] = useState(false);
    const valueToCopy = "abc123earvuin3q4rnhnwe8fu9023r9";

    const handleCopy = () => {
        navigator.clipboard.writeText(valueToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
        });
    };

    const [modalStatus, setModalStatus] = useState('closed');
    const [isPopoverModal, setIsPopoverModal] = useState(false);
    const [isClaimPopModal, setIsClaimPopModal] = useState(false);
    const [isExchangePopModal, setIsExchangePopModal] = useState(false);
    const [isConfirmTxPopModal, setIsConfirmTxPopModal] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);
    const [err, setErr] = useState({
        isErr: false, errMsg: ''
    });
    const { data, isDark } = useWalletContext();


    //sepolia network
    const contractAddress = import.meta.env.VITE_STAKE_CA;
    const tokenContractAddress = import.meta.env.VITE_TOKEN_CA;

    const fetchStakingData = async () => {
        try {
            if (!data.address) {
                setStakeAmount('-');
                setReward('-');
                setStakingDuration('-');
                // setAmount('');
                setBalance('-')
                return
            }

            // Ensure window.ethereum is available
            if (typeof window.ethereum === "undefined") {
                setErr({
                    isErr: true,
                    errMsg: `Please install MetaMask or connect an Ethereum wallet.`,
                });
                return;
            }

            const web3 = new Web3(window.ethereum);

            const stakingContract = new web3.eth.Contract(contractABI, contractAddress);
            const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

            const tokenBalance: any = await tokenContract.methods.balanceOf(data.address).call();
            const formattedBalance = web3.utils.fromWei(tokenBalance, "ether"); // Convert from Wei to Ether for readability
            setBalance(formattedBalance);

            // Fetch stake data from the contract
            const stakeData: any = await stakingContract.methods.stakes(data.address).call();
            const currentTime = Date.now();
            const startTime: number = Number(web3.utils.fromWei(stakeData.startTime, 0));
            if (startTime === 0) {
                setStakingDuration(0)
            } else {
                const duration = Math.floor((currentTime / 1000 - startTime) / 3600 / 24);
                if (duration <= 0) {
                    setStakingDuration(0)
                } else {
                    setStakingDuration(duration); // Replace with your logic for duration
                }
            }
            setStakeAmount(web3.utils.fromWei(stakeData.amount, "ether"));
            setReward(web3.utils.fromWei(stakeData.rewardDebt, "ether"));

            // if (modalStatus === true) {
            //     setAmount(formattedBalance);
            // } else {
            //     setAmount(web3.utils.fromWei(stakeData.amount, "ether"))
            // }

        } catch (error) {
            console.error("Error fetching staking data:", error);
        }
    };

    useEffect(() => {
        fetchStakingData();
    }, [data]);

    const handleClaimAction = () => {
        setModalStatus('opened');
    }

    // const handleStake = async () => {
    //     if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    //         setErr({
    //             isErr: true,
    //             errMsg: `Please enter a valid amount to stake.`,
    //         });
    //         return;
    //     }

    //     if (Number(amount) > Number(balance)) {
    //         setErr({
    //             isErr: true,
    //             errMsg: `You have insufficient balance to stake !!!`,
    //         });
    //         setAmount('')
    //         return
    //     }

    //     try {
    //         // Ensure the wallet is connected
    //         if (!data.address) {
    //             setErr({
    //                 isErr: true,
    //                 errMsg: `Please connect your wallet first.`,
    //             });
    //             return;
    //         }

    //         // Ensure window.ethereum is available
    //         if (typeof window.ethereum === "undefined") {
    //             setErr({
    //                 isErr: true,
    //                 errMsg: `Please install MetaMask or connect an Ethereum wallet.`,
    //             });
    //             return;
    //         }

    //         setModalStatus('loading');

    //         // Initialize Web3
    //         const web3 = new Web3(window.ethereum);
    //         await window.ethereum.request({ method: "eth_requestAccounts" }); // Request user accounts
    //         const accounts = await web3.eth.getAccounts();
    //         const account = accounts[0]; // Get the user's account address

    //         const stakingContract = new web3.eth.Contract(contractABI, contractAddress);
    //         const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

    //         const stakeAmount = web3.utils.toWei(amount, "ether");

    //         // Approve the staking contract to spend tokens
    //         const approvalTx = await tokenContract.methods.approve(contractAddress, stakeAmount).send({ from: account });
    //         console.log("Approval transaction sent:", approvalTx.transactionHash);

    //         // Call the stake function
    //         const stakeTx = await stakingContract.methods.stake(stakeAmount).send({ from: account });
    //         fetchStakingData();
    //         console.log("Stake transaction sent:", stakeTx.transactionHash);

    //         setErr({
    //             isErr: true,
    //             errMsg: `Tokens staked successfully!`,
    //         });
    //         setAmount(''); // Reset the input field
    //     } catch (error) {
    //         console.error("Error during staking:", error);
    //         setErr({
    //             isErr: true,
    //             errMsg: `An error occurred during staking. Please try again.`,
    //         });
    //     } finally {
    //         handleCloseModal();
    //     }
    // };

    const handleClaim = () => {
        try {
            console.log('claiming....')
        } catch (error) {
            console.error(error)
        } finally {
            setIsClaimPopModal(false);
            setIsClaimed(true);
        }
    }

    const handleCloseModal = () => {
        setModalStatus('closed');
        setIsClaimed(false)
        // setAmount('')
    }

    return (
        <div className="!bg-black">
            <div className="w-full bg-primary-bg">
                <div className="w-full 2xl:w-[1280px] 2xl:mx-auto md:px-8 2xl:px-0 px-4 text-primary pt-20 gap-20">
                    <div className="w-full md:pt-[80px] pt-[30px] bg-primary-bg">
                        <div className="space-y-6">
                            <InfoCard disabled={!data?.address} label='total-reward' value={reward} viewDetail={`https://sepolia.etherscan.io/address/${import.meta.env.VITE_STAKE_CA}#tokentxns`} />
                            {/* <div className="flex lg:hidden lg:flex-row flex-col gap-6">
                                <div className="flex md:flex-row flex-col gap-6">
                                    <InfoCard disabled={!data?.address} label='stake' value={stakeAmount} viewDetail={`https://sepolia.etherscan.io/address/${import.meta.env.VITE_STAKE_CA}#tokentxns`} stakeAction={handleStakeAction} unstakeAction={handleUnstakeAction} />
                                    <InfoCard disabled={!data?.address} label='duration' value={stakingDuration} viewDetail={`https://sepolia.etherscan.io/address/${import.meta.env.VITE_STAKE_CA}#tokentxns`} />
                                </div>
                                <InfoCard disabled={!data?.address} label='balance' value={balance} viewDetail={`https://sepolia.etherscan.io/address/${data?.address}`} stakeAction={handleStakeAction} unstakeAction={handleUnstakeAction} />
                            </div> */}
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                <InfoCard disabled={!data?.address} label='premier-staking' value={stakeAmount} viewDetail={`https://sepolia.etherscan.io/address/${import.meta.env.VITE_STAKE_CA}#tokentxns`} />
                                <InfoCard disabled={!data?.address} label='network-founder-reward' value={stakingDuration} viewDetail={`https://sepolia.etherscan.io/address/${import.meta.env.VITE_STAKE_CA}#tokentxns`} claimAction={handleClaimAction}>
                                    <div className="text-primary text-[14px] flex flex-col gap-4">
                                        <div className="font-bold">You've been awarded WMTb - World Mobile bonus tokens, with a 1:1 value to WMTx.</div>
                                        <div>These tokens can be staked in Core and Premier staking programs just like WMTx. They remain locked until the official unlock date.</div>
                                        <div>You cannot transfer or use them for any other purpose before the unlock.</div>
                                        <div>Once unlocked, they can be exchanged for WMTx.</div>
                                    </div>
                                </InfoCard>
                                <InfoCard disabled={!data?.address} label='airnodes' value={balance} viewDetail={`https://sepolia.etherscan.io/address/${data?.address}`} />
                                <InfoCard disabled={!data?.address} label='core-staking' value={balance} viewDetail={`https://sepolia.etherscan.io/address/${data?.address}`} />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className={`rounded-3xl bg-card-bg mx-auto flex flex-col gap-6 md:px-6 md:py-8 p-6 w-full justify-between`}>
                                    <div className="space-y-6">
                                        <div className="flex flex-row justify-between items-start">
                                            <div className={`text-primary text-[16px] font-semibold`}>Upgrade Tier</div>
                                            <InfoIcon className="text-primary" />
                                        </div>
                                        <div>
                                            {isDark ?
                                                <img src={Tier_dark_img} alt="tier" /> :
                                                <img src={Tier_light_img} alt="tier" />
                                            }
                                        </div>
                                    </div>
                                    <button className={`text-primary px-4 py-2 hover:text-[#5b5b5b] rounded-full border border-[#404040] cursor-pointer flex flex-row justify-center items-center gap-2 w-max`}>
                                        Upgrade
                                    </button>
                                </div>
                                <div className={`rounded-3xl bg-card-bg mx-auto flex flex-col gap-6 md:px-6 md:py-8 p-6 w-full justify-between`}>
                                    <div className="space-y-12">
                                        <div className="flex flex-row justify-between items-start">
                                            <div className={`text-primary text-[16px] font-semibold`}>Refer and earn</div>
                                            <InfoIcon className="text-primary" />
                                        </div>
                                        <div className="text-primary text-[14px] md:w-[80%] w-full">
                                            Invite your friends and family to join World Mobile and earn rewards.
                                        </div>
                                    </div>
                                    <button className={`text-primary px-4 py-2 hover:text-[#5b5b5b] rounded-full border border-[#404040] cursor-pointer flex flex-row justify-center items-center gap-2 w-max`}>
                                        Get started
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={modalStatus} onClose={handleCloseModal}>
                <h2 className="text-[18px] font-semibold text-primary flex justify-center">Network Founder Reward</h2>
                <div className="text-[14px] text-light-text mt-4">You're among the first to join our new World Mobile USA and Global Access plans - making you a pioneer in our movement to decentralize connectivity.</div>
                <div className={`rounded-3xl bg-card-bg mx-auto flex flex-col gap-6 md:px-6 md:py-8 p-6 w-full`}>
                    <div className="flex flex-row justify-between items-center">
                        <div className={`text-primary font-[600]`}>Total reward</div>
                        <InfoIcon onClick={() => setIsPopoverModal(true)} className={`text-primary`} />
                        <PopoverModal isOpen={isPopoverModal} onClose={() => setIsPopoverModal(false)} title='Total reward'
                        // buttonActionTitle="Test" actionButtonstyle='bg-primary text-primary-bg'
                        >
                            <div className="text-light-text text-[14px] flex flex-col gap-4">
                                <div>Includes all World Mobile Bonus Tokens (WMTb): locked, unlocked, and exchanged.</div>
                                <div>Locked tokens can only be used for staking until their unlock date. Post-unlock, you may exchange WMTb with WMTx at a 1:1 value.</div>
                            </div>
                        </PopoverModal>
                    </div>
                    <div className={`font-bold text-primary text-4xl`}>{(shortNumber(Number(balance === '-' ? 0 : balance)) + 'WMTb')}</div>
                </div>
                <div className="flex flex-col w-full gap-1">
                    <div className="text-primary">Contract</div>
                    <div className="rounded-3xl bg-card-bg mx-auto flex flex-col gap-6 p-6 w-full mt-4 text-primary">
                        <div className="text-[16px]">US Advanced SIM plan - 12 month</div>
                        <div className="flex flex-row w-full">
                            <div className="flex flex-col gap-2 w-[50%]">
                                <div className="text-[14px]">Unlock date</div>
                                <div className="text-[16px]">18 Mar 2025</div>
                            </div>
                            <div className="flex flex-col gap-2 w-[50%]">
                                <div className="text-[14px]">Reward</div>
                                <div className="text-[16px]">150 WMTb</div>
                            </div>
                        </div>
                        {
                            !isClaimed ?
                                (data.address ?
                                    <button
                                        onClick={() => setIsClaimPopModal(true)}
                                        className={`rounded-3xl py-2 px-4 text-[16px] bg-[#fff533] text-black hover:text-[#5b5b5b] font-bold flex flex-row items-center justify-center gap-1 w-max`}
                                    >
                                        Claim
                                    </button> :
                                    <div className="flex items-center justify-center w-full">
                                        <ConnectWalletButton className="bg-black hover:bg-[#fff533] hover:text-black hover:border-yellow-300 text-white px-4 py-2 rounded-full border border-[#525252] font-semibold flex flex-row gap-1" />
                                    </div>) :
                                <div className="flex flex-col gap-3">
                                    <div className="w-max rounded-3xl py-2 px-4 text-[16px] text-light-border border border-light-border cursor-not-allowed">Exchanged</div>
                                    <div onClick={() => setIsConfirmTxPopModal(true)} className="w-max rounded-3xl py-2 px-4 text-[16px] text-primary border border-light-border hover:text-[#5b5b5b] cursor-pointer">View confirmation of exchange</div>
                                    <PopoverModal
                                        isOpen={isConfirmTxPopModal}
                                        onClose={() => setIsConfirmTxPopModal(false)}
                                        title='Confirmation of exchange'
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="space-y-1">
                                                <div className="text-[14px] text-light">Contract</div>
                                                <div className="text-[16px] text-primary">US Advanced SIM plan - 12 month</div>
                                            </div>
                                            <div className="flex flex-row w-full">
                                                <div className="space-y-1 w-[50%]">
                                                    <div className="text-[14px] text-light">Unlock date</div>
                                                    <div className="text-[16px] text-primary">18 Mar 2025</div>
                                                </div>
                                                <div className="space-y-1 w-[50%]">
                                                    <div className="text-[14px] text-light">Reward</div>
                                                    <div className="text-[16px] text-primary">150 WMTb</div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[14px] text-light">Transaction ID</div>
                                                <div className="flex flex-row gap-2">
                                                    <div className="text-[16px] text-primary">{valueToCopy}</div>
                                                    <div onClick={handleCopy}>
                                                        <CopyIcon />
                                                    </div>
                                                </div>
                                                {copied && <span className="text-sm text-green-500">Copied!</span>}
                                            </div>
                                        </div>
                                    </PopoverModal>
                                </div>
                        }
                        <PopoverModal
                            isOpen={isClaimPopModal}
                            onClose={() => setIsClaimPopModal(false)}
                            title='Claiming your World Mobile Bonus Tokens'
                            buttonActionTitle="I understand and claim"
                            actionButtonstyle='bg-primary text-primary-bg'
                            buttonAction={handleClaim}
                        >
                            <div className="text-light-text text-[14px] flex flex-col gap-4">
                                <div>Claiming your World Mobile Bonus Tokens (WMTb) will transfer them to the wallet you have currently connected. <span className="font-semibold">You cannot transfer them to another wallet before they unlock.</span> Once unlocked, you may exchange your WMTb for WMTx and use them as regular tokens.</div>
                                <div>Please ensure you claim your WMTb to a wallet you can use for the entire locking period.</div>
                            </div>
                        </PopoverModal>
                    </div>
                    {
                        isClaimed &&
                        <div>
                            <div className="rounded-3xl bg-card-bg mx-auto flex flex-col gap-6 p-6 w-full mt-1 text-primary">
                                <div className="text-[16px]">US Advanced SIM plan - 12 month</div>
                                <div className="flex flex-row w-full">
                                    <div className="flex flex-col gap-2 w-[50%]">
                                        <div className="text-[14px]">Unlock date</div>
                                        <div className="text-[16px]">18 Mar 2025</div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-[50%]">
                                        <div className="text-[14px]">Reward</div>
                                        <div className="text-[16px]">150 WMTb</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsExchangePopModal(true)}
                                    className={`rounded-3xl py-2 px-4 text-[16px] bg-[#fff533] text-black hover:text-[#5b5b5b] font-bold flex flex-row items-center justify-center gap-1 w-max`}
                                >
                                    Exchange
                                </button>
                                <PopoverModal
                                    isOpen={isExchangePopModal}
                                    onClose={() => setIsExchangePopModal(false)}
                                    title='Exchange your World Mobile Bonus Tokens'
                                    buttonActionTitle="Exchange"
                                    actionButtonstyle='bg-[#fff533] text-black'
                                // buttonAction={handleClaim}
                                >
                                    <div className="text-light-text text-[14px] flex flex-col gap-4">
                                        <div>Your WMTb are unlocked. They can now be exchanged for WMTx. This will permanently burn your WMTb and exchange them for an equal amount of WMTx.</div>
                                    </div>
                                </PopoverModal>
                            </div>
                            <div className="rounded-3xl bg-card-bg mx-auto flex flex-col gap-6 p-6 w-full mt-2 text-primary">
                                <div className="text-[16px]">Global Access plan - 6 month</div>
                                <div className="flex flex-row w-full">
                                    <div className="flex flex-col gap-2 w-[50%]">
                                        <div className="text-[14px]">Unlock date</div>
                                        <div className="text-[16px]">18 Mar 2025</div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-[50%]">
                                        <div className="text-[14px]">Reward</div>
                                        <div className="text-[16px]">150 WMTb</div>
                                    </div>
                                </div>
                                <div className="w-max rounded-3xl py-2 px-4 text-[16px] text-light-border border border-light-border cursor-not-allowed">Locked</div>
                            </div>
                        </div>
                    }
                </div>
                <div
                    onClick={handleCloseModal}
                    className="border border-light-border rounded-full text-primary h-[56px] flex justify-center items-center cursor-pointer hover:text-[#525252]"
                >
                    Close
                </div>
            </Modal>
            {err.isErr && <Alert data={err.errMsg} onClose={() => setErr({ isErr: false, errMsg: '' })} />}
        </div>
    )
}

export default Home;