import { useLayoutEffect } from "react";

interface PopoverModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    buttonActionTitle?: string
    actionButtonstyle?: string;
    buttonAction?: () => void;
}

const PopoverModal: React.FC<PopoverModalProps> = ({ isOpen, onClose, title, children, buttonActionTitle, actionButtonstyle, buttonAction }) => {
    useLayoutEffect(() => {
        if (isOpen === true) {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = "auto"; // Restore scrolling
        }

        return () => {
            document.body.style.overflow = "auto"; // Cleanup on unmount
        };
    }, [isOpen]);

    if (isOpen === false) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50">
            {/* Modal Content */}
            <div className="fixed bottom-4 right-4 min-[390px]:w-[350px] w-[calc(100%-32px)] px-6 py-6 bg-modal-bg rounded-2xl">
                <div className="text-[24px] text-primary">{title}</div>
                <div className="mt-8 text-primary">
                    {children}
                </div>
                <div className="mt-6 flex flex-col gap-4 justify-center items-center w-full">
                    {buttonActionTitle &&
                        <button
                            onClick={buttonAction}
                            className={`text-[16px] hover:text-[#525252] w-full h-[56px] rounded-full ${actionButtonstyle}`}
                        >
                            {buttonActionTitle}
                        </button>
                    }
                    <button
                        onClick={onClose}
                        className={`${buttonActionTitle ? 'border-light-border border text-primary text-[16px] hover:text-[#525252] w-full h-[56px] rounded-full' : 'bg-primary text-primary-bg text-[16px] hover:text-[#525252] w-full h-[56px] rounded-full'}`}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopoverModal;
