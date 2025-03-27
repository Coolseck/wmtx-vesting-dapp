import React, { createContext, useState, useContext } from 'react';

interface Wallet {
    connected: boolean,
    address: string
}

// Define initial state for data
const initialData: Wallet = {
    connected: false,
    address: ''
};

// Create Context
const WalletContext = createContext<{
    data: Wallet;
    isDark: boolean
    // loading: boolean;
    updateData: ({ connected, address }: Wallet) => void;
    updateDarkMode: (isDark: boolean) => void;
} | null>(null);

// Export custom hook
export const useWalletContext = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWalletContext must be used within a WalletProvider');
    }
    return context;
};

// Provider
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<Wallet>(initialData);
    const [isDark, setIsDark] = useState(true);

    // Update method
    const updateData = (wallet: Wallet) => {
        setData(wallet);
    };
    const updateDarkMode = (isDark: boolean) => {
        setIsDark(isDark);
    }

    return (
        <WalletContext.Provider value={{ data, isDark, updateData, updateDarkMode }}>
            {children}
        </WalletContext.Provider>
    );
};
