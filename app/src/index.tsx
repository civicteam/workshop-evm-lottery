import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { phantomWallet } from '@rainbow-me/rainbowkit/wallets';
import { polygonMumbai } from 'wagmi/chains';

// needed for web3 signMessage to work
import { Buffer } from "buffer/";

import './index.css'

window.Buffer = window.Buffer || Buffer;

const clientChains = [polygonMumbai];
const { chains, provider } = configureChains(clientChains, [publicProvider()]);

const { wallets } = getDefaultWallets({ appName: 'Civic Pass Lottery Sample', chains });

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [phantomWallet({ chains })],
    },
]);
const client = createClient({
    autoConnect: true,
    connectors,
    provider,
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <WagmiConfig client={client}>
            <RainbowKitProvider chains={clientChains} modalSize="compact">
                <App />
            </RainbowKitProvider>
        </WagmiConfig>
    </React.StrictMode>
);