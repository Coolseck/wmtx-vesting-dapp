import Gold_avatar from '../assets/img/gold.png'
import Silver_avatar from '../assets/img/silver.png'
import Bronze_avatar from '../assets/img/bronze.png'
import { shortNumber } from '../pages/leaderBoard'

const LeaderboardCard = ({ data, ranking }: any) => {

    // const getColorByRanking = (ranking: number) => {
    //     switch (ranking) {
    //         case 1:
    //             return "#FFD700";
    //         case 2:
    //             return "#C0C0C0";
    //         case 3:
    //             return "#CD7F32";
    //         default:
    //             return "#fff533";
    //     }
    // }

    return (
        <div className="relative w-full rounded-2xl overflow-hidden bg-card-bg z-10 px-8 py-7 space-y-8">
            <div className={`flex justify-between`}>
                <div></div>
                <div className="rounded-3xl text-black w-max flex items-center justify-center px-2 bg-[#fff533]">Legend</div>
            </div>
            <div className={`text-primary font-[600] flex gap-3`}>
                <div className="text-7xl">{ranking}</div>
                <div className="text-4xl">{ranking === 1 ? "st" : ranking === 2 ? "nd" : ranking === 3 ? "rd" : ranking}</div>
            </div>
            {/* Avatar Positioned at the Meeting Point */}
            <div className="flex items-center justify-start w-full">
                <img
                    src={ranking === 1 ? Gold_avatar : ranking === 2 ? Silver_avatar : ranking === 3 ? Bronze_avatar : Gold_avatar}
                    alt="Avatar"
                    className="w-40 h-40 p-1"
                />
            </div>
            {/* <div className="text-2xl absolute top-24 left-24 transform -translate-x-1/2">
                    {ranking === 1 ? "🥇" : ranking === 2 ? "🥈" : ranking === 3 ? "🥉" : ranking}
                </div> */}
            <div className='flex flex-col gap-3'>
                <h2 className="text-lg text-light">{data.address.slice(0, 10) + '...' + data.address.slice(-7)}</h2>
                <div className="flex flex-row justify-between">
                    <div className="text-primary font-bold">Staked</div>
                    <div className="text-light">{shortNumber(Math.floor?.(Number(data.currentlyStaked) / 10 ** 18))}</div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="text-primary font-bold">Joined</div>
                    <div className="text-light">{new Date(Number(data.createdAt) * 1000).toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardCard;