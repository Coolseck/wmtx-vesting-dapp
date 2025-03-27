import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOP_STAKERS } from "../utils/subgraph/queries";
import client from "../utils/subgraph/apolloClient";
import Spinner from "../components/Spinner";
import LeaderboardCard from "../components/LeaderboardCard";

import Gold_avatar from '../assets/img/gold.png'
import Silver_avatar from '../assets/img/silver.png'
import Bronze_avatar from '../assets/img/bronze.png'
import Blue_avatar from '../assets/img/blue.png'

export const shortNumber = (num: number) => {
    let formatted: string;

    if (num >= 1e9) formatted = (num / 1e9).toFixed(2) + "B";
    else if (num >= 1e6) formatted = (num / 1e6).toFixed(2) + "M";
    else if (num >= 1e3) formatted = (num / 1e3).toFixed(2) + "K";
    else formatted = num.toFixed(2);

    // Remove trailing zeros and unnecessary decimal points
    return formatted.replace(/\.?0+([KM])?$/, '$1') + " ";
};


interface Staker {
    id: string;
    address: string;
    totalStaked: string;
    totalUnstaked: string;
    currentlyStaked: string;
    createdAt: string | number;
    updatedAt: string | number;
}

interface GetTopStakersData {
    stakers: Staker[];
}

const LeaderboardTable = () => {

    const { loading, error, data } = useQuery<GetTopStakersData>(GET_TOP_STAKERS, {
        client,
    });

    useEffect(() => {
        if (error) {
            alert(error.message)
        }
    }, []);

    return (
        <>
            {
                loading ? <Spinner size='12' color='white' /> : (
                    <>
                        <div className="flex flex-col md:flex-row lg:justify-center justify-around gap-6 items-center w-full pt-10 pb-10">
                            <LeaderboardCard data={data?.stakers[0]} ranking={1} />
                            <LeaderboardCard data={data?.stakers[1]} ranking={2} />
                            <LeaderboardCard data={data?.stakers[2]} ranking={3} />
                        </div>
                        <div className="w-full lg:flex hidden flex-col items-center relative bg-card-bg rounded-3xl overflow-hidden md:px-8 px-4 md:py-6 py-3">
                            {/* Table Header */}
                            <div className="w-full rounded-t-3xl flex justify-between items-center md:px-6 px-1 py-4 text-primary md:text-lg text-sm font-bold sticky top-0 z-10">
                                <span className="md:w-1/12 w-1/12">#</span>
                                <span className="md:w-4/12 w-3/12">User</span>
                                <span className="md:w-2/12 w-3/12">Joined</span>
                                <span className="md:w-2/12 w-2/12">Status</span>
                                <span className="md:w-2/12 w-2/12">Staked</span>
                                <span className="md:w-1/12 w-1/12"></span>
                            </div>

                            {/* Scrollable Rows */}
                            <div className="w-full overflow-y-auto">
                                {data?.stakers.map((row, index) => (
                                    <div
                                        key={index}
                                        className={`w-full flex justify-between items-center md:px-6 px-1 py-4 text-light text-sm md:text-lg backdrop-blur border-t border-light-border`}
                                    >
                                        <span className="md:w-1/12 w-1/12">{index + 1}</span>
                                        <div className="md:w-4/12 w-3/12 flex items-center md:space-x-4 space-x-2">
                                            <img
                                                src={index === 0 ? Gold_avatar : index === 1 ? Silver_avatar : index === 2 ? Bronze_avatar : Blue_avatar}
                                                alt="Avatar"
                                                className="md:w-10 md:h-10 w-8 h-8"
                                            />
                                            <span className="hidden md:flex">{(row.address).slice(0, 7) + '...' + (row.address).slice(-5)}</span>
                                            <span className="md:hidden">{(row.address).slice(0, 7)}...</span>
                                        </div>
                                        <span className="md:w-2/12 w-3/12">{new Date(Number(row.createdAt) * 1000).toLocaleDateString()}</span>
                                        <span className="md:w-2/12 w-2/12">Legend</span>
                                        <span className="md:w-2/12 w-2/12">
                                            {shortNumber(Math.floor?.(Number(row.currentlyStaked) / 10 ** 18))}
                                        </span>
                                        <span className="md:w-1/12 w-1/12">WMTx</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:hidden flex flex-col relative bg-card-bg rounded-3xl overflow-hidden md:px-8 px-4 md:py-6 py-3">
                            <div className="space-y-4 w-full">
                                {data?.stakers.map((row, index) => (
                                    <div className="flex flex-row justify-between border-b border-b-light-border last:border-b-0 pb-4" key={index}>
                                        <div className="flex flex-col space-y-4 justify-center text-primary">
                                            <span className="">#</span>
                                            <span className="">User</span>
                                            <span className="">Joined</span>
                                            <span className="">Status</span>
                                            <span className="">Staked</span>
                                        </div>
                                        <div className="flex flex-col space-y-4 justify-center items-end text-light">
                                            <span className="">{index + 1}</span>
                                            <div className="flex items-center md:space-x-4 space-x-2">
                                                <img
                                                    src={index === 0 ? Gold_avatar : index === 1 ? Silver_avatar : index === 2 ? Bronze_avatar : Blue_avatar}
                                                    alt="Avatar"
                                                    className="w-8 h-8"
                                                />
                                                <span className="flex">{(row.address).slice(0, 7) + '...' + (row.address).slice(-5)}</span>
                                            </div>
                                            <span className="">{new Date(Number(row.createdAt) * 1000).toLocaleDateString()}</span>
                                            <span className="">Legend</span>
                                            <span className="">
                                                {shortNumber(Math.floor?.(Number(row.currentlyStaked) / 10 ** 18)) + ' WNTx'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );

};

const LeaderBoard: React.FC = () => {
    return (
        <div className="bg-primary-bg rounded-b-[60px] relative z-[10]">
            <div className="w-full 2xl:w-[1280px] 2xl:mx-auto md:px-8 2xl:px-0 px-4 pb-[150px]">
                {/* Hero Section */}
                <div className="relative w-full md:pt-[80px] pt-[30px]">
                    {/* Content */}
                    <div className="relative flex flex-col items-start justify-start min-h-lvh text-white z-10 pt-20 gap-3">
                        {/* <div className="md:text-lg text-lg font-bold border border-white text-white rounded-tr-3xl rounded-bl-3xl w-max px-6 py-1 mt-10 mb:mt-20">Leaderboard</div> */}
                        <div className="text-6xl 2xl:text-9xl xl:text-8xl lg:text-7xl md:text-5xl mt-5 mb:mt-20 lg:w-[95%] w-full text-primary font-semibold">Stake, rank up, and claim your rewards</div>
                        <LeaderboardTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderBoard;