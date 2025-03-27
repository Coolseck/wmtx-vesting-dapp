import React from "react";
import StakingCard from "../card";

const HeroSection: React.FC = () => {
    return (
        <div className="w-full xl:px-[10%] px-[5%] flex md:flex-row flex-col items-center justify-between h-full min-h-screen text-white z-10 pt-20 gap-20">
            <div className="w-[50%]">
                <div className="xl:w-[70%]">
                    <h1 className="text-7xl mt-5 md:mt-20">STAKE WMTx</h1>
                    <p className="mt-4 text-sm md:text-xl md:text-">
                        Stake your WMTx, earn WMTx to get more allocations in Decentralized Telecommunications
                    </p>
                </div>
            </div>
            <div className="w-[50%]">
                <StakingCard />
            </div>
        </div>
    );
};

export default HeroSection;
