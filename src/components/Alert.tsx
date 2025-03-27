import React, { useEffect, useState } from 'react';

const Alert: React.FC<{ data: string, onClose: () => void }> = ({ data, onClose }: any) => {
    const [errData, setErrData] = useState('')

    useEffect(() => {
        if (data?.includes('Transaction has been reverted by the EVM')) {
            setErrData('Transaction has been reverted by the EVM')
        } else {
            setErrData(data)
        }
    }, [])

    return (
        <>
            <div
                className="pt-[20px] md:px-auto px-4 fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center md:items-start w-full h-screen bg-black bg-opacity-50"
            // onClick={closeModal}
            >
                <div
                    className="relative p-4 w-full max-w-md bg-primary-bg border border-light-border rounded-lg shadow"
                    onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-primary bg-transparent hover:text-light rounded-full text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                            aria-hidden="true"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>

                    {/* Modal Content */}
                    <div className="p-4 md:p-5 text-center">
                        <svg
                            className="mx-auto mb-4 text-[#fff533] w-12 h-12"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-primary">
                            {errData}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-black bg-[#fff533] hover:bg-[#ccc42a] focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-8 py-2.5 text-center"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Alert;