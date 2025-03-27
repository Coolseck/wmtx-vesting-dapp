import { useState, useRef, useEffect } from "react";

interface PopoverProps {
    toggleChildren: React.ReactNode;
    children: React.ReactNode;
    position: string;
}

const Popover: React.FC<PopoverProps> = ({ toggleChildren, children, position }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    // Toggle popover visibility
    const togglePopover = () => {
        setIsOpen(!isOpen);
    };

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block">
            {/* Button to toggle popover */}
            <div onClick={togglePopover} ref={buttonRef}>
                {toggleChildren}
            </div>
            {/* Popover Content */}
            {isOpen && (
                <div
                    ref={popoverRef}
                    className={`absolute ${position} ml-2 top-0 mt-1 w-48 bg-primary-bg border border-[#5b5b5b] text-primary rounded-lg shadow-lg px-3 py-1`}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Popover;
