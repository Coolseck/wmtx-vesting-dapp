import { InfoIcon, SquareArrowOutUpRight } from "lucide-react";
import PopoverModal from "./PopoverModal";
import { shortNumber } from "../pages/leaderBoard";
import { useState } from "react";
import { ConnectWalletButton } from "../utils/lib/connect-button";
import { useWalletContext } from "../utils/context/walletContext";

const InfoCard = ({ disabled, label, value, stakeAction, unstakeAction, viewDetail, staked, children }: any) => {

    const { data } = useWalletContext();
    const [price, setPrice] = useState(0);
    const [modalStatus, setModalStatus] = useState(false);

    const getTitle = () => {
        switch (label) {
            case "reward":
                return "Total Rewards";
            case "stake":
                return "Total Stake";
            case "duration":
                return "Staking Duration";
            case "balance":
                return "WMTx Balance";
            case "canstake":
                return "Available to stake";
            case "canunstake":
                return "Available to unstake";
            default:
                return "Total Rewards";
        }
    }

    const handleViewDetails = () => {
        window.open(viewDetail, "_blank", "noopener,noreferrer");
    }

    if (label !== 'duration' && value !== '-' && value !== 0) {
        const COINGEKO_API = `https://api.coingecko.com/api/v3/simple/price?ids=world-mobile-token&vs_currencies=usd&x_cg_demo_api_key=${import.meta.env.VITE_COINGECKO_API}`
        const options = {
            method: 'GET',
            // headers: { accept: 'application/json', 'x_cg_demo_api_key': import.meta.env.VITE_COINGECKO_API }
        };

        fetch(COINGEKO_API, options)
            .then(res => res.json())
            .then(res => setPrice(res["world-mobile-token"].usd))
            .catch(err => console.error(err));
    }


    return (
        <div className={`rounded-3xl ${label === 'reward' ? 'bg-[#fff533]' : 'bg-card-bg'} mx-auto flex flex-col gap-6 md:px-6 md:py-8 p-6 w-full`}>
            <div className="flex flex-row justify-between items-center">
                <div className={`${label === 'reward' ? 'text-black' : 'text-primary'} font-[600]`}>{getTitle()}</div>
                {/* <Popover
                    toggleChildren={<InfoIcon className={`${label === 'reward' ? 'text-black' : 'text-primary'}`} />}
                    position="right-full"
                >
                    <div>{getHint()}</div>
                </Popover> */}
                <InfoIcon onClick={() => setModalStatus(true)} className={`${label === 'reward' ? 'text-black' : 'text-primary'}`} />
                <PopoverModal isOpen={modalStatus} onClose={() => setModalStatus(false)} title={getTitle()}
                // buttonActionTitle="Test" actionButtonstyle='bg-primary text-primary-bg'
                >
                    {children}
                </PopoverModal>
            </div>
            <div>
                <div className={`font-bold ${label === 'reward' ? 'text-black text-5xl' : 'text-primary text-4xl'}`}>{label === 'duration' ? (value === '-' ? 0 : value) + (value === 1 ? ' Day' : ' Days') : (label === 'reward' && (!data.address || !staked)) ? 'Stake WMTx' : shortNumber(Number(value === '-' ? 0 : value)) + 'WMTx'}</div>
                <div className={`text-sm font-semibold ${label === 'reward' ? 'text-black' : 'text-light'}`}>{label === 'duration' ? '\u00A0' : shortNumber((Number(value === '-' ? 0 : value)) * price) + ' USD'}</div>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
                {
                    (label === 'reward' && !data.address) &&
                    <ConnectWalletButton className={`bg-black hover:bg-[#fff533] hover:text-black hover:border-yellow-300 text-white rounded-full border border-[#525252] font-semibold flex flex-row gap-1 ${label === 'reward' ? 'px-6 py-3' : 'px-4 py-2'}`} />
                }
                {
                    ((label === "balance" || label === 'reward') && data.address) &&
                    <button onClick={stakeAction} className={`hover:text-[#5b5b5b] rounded-full cursor-pointer w-max ${label === 'reward' ? 'text-white bg-black px-6 py-3' : 'text-black bg-[#FFF533] px-4 py-2'}`}>Stake {staked && 'more'}</button>
                }
                {
                    ((label === "stake" || label === 'reward') && data.address) &&
                    <button onClick={unstakeAction} className={`bg-[#FFF533] hover:text-[#5b5b5b] text-black rounded-full cursor-pointer w-max ${label === 'reward' ? 'border border-[#5b5b5b] px-6 py-3' : 'px-4 py-2'}`}>Unstake</button>
                }
                {
                    !(label == "canstake" || label == "canunstake") &&
                    <button disabled={disabled} onClick={handleViewDetails} className={`${label === 'reward' ? 'text-black px-6 py-3' : 'text-primary px-4 py-2'} hover:text-[#5b5b5b] rounded-full border border-[#525252] ${disabled ? 'cursor-not-allowed text-[#525252]' : 'cursor-pointer'} flex flex-row justify-center items-center gap-2 w-max`}>
                        <div>View Details</div>
                        <SquareArrowOutUpRight className="font-bold" />
                    </button>
                }
            </div>
        </div>
    )
}

export default InfoCard;