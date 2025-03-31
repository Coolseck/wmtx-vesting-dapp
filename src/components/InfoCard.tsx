import { InfoIcon, SquareArrowOutUpRight } from "lucide-react";
import PopoverModal from "./PopoverModal";
import { shortNumber } from "../pages/leaderBoard";
import { useState } from "react";
import { ConnectWalletButton } from "../utils/lib/connect-button";
import { useWalletContext } from "../utils/context/walletContext";

const InfoCard = ({ disabled, label, value, claimAction, viewDetail, children }: any) => {

    const { data } = useWalletContext();
    const [price, setPrice] = useState(0);
    const [modalStatus, setModalStatus] = useState(false);

    const getTitle = () => {
        switch (label) {
            case "total-reward":
                return "Total Rewards";
            case "premier-staking":
                return "Premier Staking";
            case "network-founder-reward":
                return "Network Founder Reward";
            case "airnodes":
                return "AirNodes";
            case "core-staking":
                return "Core Staking";
            case "claim":
                return "Available to stake";
            default:
                return "Total Rewards";
        }
    }

    const getViewButtonContent = () => {
        switch (label) {
            case "total-reward":
                return "View details";
            case "premier-staking":
                return "View";
            case "network-founder-reward":
                return "Details";
            case "airnodes":
                return "View";
            case "core-staking":
                return "View";
            default:
                return "View details";
        }
    }

    const handleViewDetails = () => {
        if (label === 'network-founder-reward') {
            claimAction();
        } else {
            window.open(viewDetail, "_blank", "noopener,noreferrer");
        }
    }

    if (value !== '-' && value !== 0) {
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
        <div className={`rounded-3xl ${label === 'total-reward' ? 'bg-[#fff533]' : 'bg-card-bg'} mx-auto flex flex-col gap-6 md:px-6 md:py-8 p-6 w-full`}>
            <div className="flex flex-row justify-between items-center">
                <div className={`${label === 'total-reward' ? 'text-black' : 'text-primary'} font-[600]`}>{getTitle()}</div>
                {/* <Popover
                    toggleChildren={<InfoIcon className={`${label === 'total-reward' ? 'text-black' : 'text-primary'}`} />}
                    position="right-full"
                >
                    <div>{getHint()}</div>
                </Popover> */}
                <InfoIcon onClick={() => setModalStatus(true)} className={`${label === 'total-reward' ? 'text-black' : 'text-primary'}`} />
                <PopoverModal isOpen={modalStatus} onClose={() => setModalStatus(false)} title={getTitle()}
                // buttonActionTitle="Test" actionButtonstyle='bg-primary text-primary-bg'
                >
                    {children}
                </PopoverModal>
            </div>
            <div>
                <div className={`font-bold ${label === 'total-reward' ? 'text-black text-5xl' : 'text-primary text-4xl'}`}>{label === 'duration' ? (value === '-' ? 0 : value) + (value === 1 ? ' Day' : ' Days') : (shortNumber(Number(value === '-' ? 0 : value)) + 'WMTx')}</div>
                <div className={`text-sm font-semibold ${label === 'total-reward' ? 'text-black' : 'text-light'}`}>{label === 'duration' ? '\u00A0' : shortNumber((Number(value === '-' ? 0 : value)) * price) + ' USD'} {label === 'premier-staking' ? '• Bronze Tier' : label === 'airnodes' ? '• 20.3 GB Data transfer' : ''}</div>
            </div>
            <div className="flex md:flex-row flex-col gap-3">
                {
                    (label === 'total-reward' && !data.address) &&
                    <ConnectWalletButton className={`bg-black hover:bg-[#fff533] hover:text-black hover:border-yellow-300 text-white rounded-full border border-[#525252] font-semibold flex flex-row gap-1 ${label === 'total-reward' ? 'px-6 py-3' : 'px-4 py-2'}`} />
                }
                <button disabled={disabled} onClick={handleViewDetails} className={`${label === 'total-reward' ? 'bg-black text-white' : 'text-primary-bg bg-primary'} hover:text-[#5b5b5b] rounded-full border border-[#525252] px-4 py-2 ${disabled ? 'cursor-not-allowed text-[#525252]' : 'cursor-pointer'} flex flex-row justify-center items-center gap-2 w-max`}>
                    <div>{getViewButtonContent()}</div>
                    {label === 'airnodes' && <SquareArrowOutUpRight className="font-bold" />}
                </button>
                {
                    label === 'premier-staking' || label === 'core-staking' &&
                    <button className={`text-primary px-4 py-2 hover:text-[#5b5b5b] rounded-full border border-[#404040] cursor-pointer flex flex-row justify-center items-center gap-2 w-max`}>
                        {label === 'core-staking' ? 'Stake more' : 'Upgrade'}
                    </button>
                }
            </div>
        </div>
    )
}

export default InfoCard;