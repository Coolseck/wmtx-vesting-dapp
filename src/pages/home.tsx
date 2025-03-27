import Faq from "../components/home/faq";
// import Unleashed from "../components/home/unleashed";
import StakingCard from "../components/card";

export default function Home() {
    return (
        <div className="!bg-black">
            <StakingCard />
            <Faq />
            {/* <Unleashed /> */}
        </div>
    )
}