import React from "react";

const Unleashed: React.FC = () => {
    return (
        <div className="w-full bg-image-footer">
            {/* Hero Section */}
            <div className="w-full">
                {/* Content */}
                <div className="flex flex-col items-center justify-start h-[70vh] text-white mt-20 gap-3">
                    <h1 className="text-4xl md:text-7xl text-center px-4 mx-10">Earn WMTx by <br /><span className="accent-font">connecting the world</span></h1>
                    {/* <img src={Brand_wmt} alt="brand" className="xl:w-[40vw] w-[60vw] h-auto" /> */}
                </div>
            </div>
        </div>
    );
};

export default Unleashed;
