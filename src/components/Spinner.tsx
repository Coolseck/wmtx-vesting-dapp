const Spinner = ({ color, size }: any) => {
    return (
        <div className="">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <div className={`w-${size} h-${size} border-4 border-[${color}] border-t-transparent rounded-full animate-spin`}></div>
            </div>
        </div>
    )
}

export default Spinner;