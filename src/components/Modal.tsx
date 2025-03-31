import { XIcon } from "lucide-react";
import { useLayoutEffect } from "react";
import Spinner from "./Spinner";

interface ModalProps {
    isOpen: string;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

    useLayoutEffect(() => {
        if (isOpen === 'opened') {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = "auto"; // Restore scrolling
        }

        return () => {
            document.body.style.overflow = "auto"; // Cleanup on unmount
        };
    }, [isOpen]);

    if (isOpen === 'closed') return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50">
            {/* Modal Content */}
            <div className="fixed top-0 right-0 bg-primary-bg px-4 py-8 min-[390px]:w-[390px] w-full h-full overflow-y-auto min-h-screen animate-fadeIn flex flex-col justify-between items-center">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 left-4 text-[#5b5b5b] text-xl"
                >
                    <XIcon />
                </button>
                {/* Modal Body */}
                <div className="w-full flex-1 flex flex-col justify-start space-y-8">
                    {children}
                </div>
            </div>
            {isOpen === 'loading' &&
                <Spinner size='8' color='#fff533' />
            }
        </div>
    );
};

export default Modal;
