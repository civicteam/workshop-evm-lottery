import React, {useEffect} from "react";
import {LotteryProvider, useLottery} from "./LotteryContext";
import {useAccount} from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Admin = () => {
    const { client, winner, totalTickets, pot } = useLottery();

    return (<div>
        <h1>Admin Mode</h1>
        { client && <>
            <div><>Total tickets: {totalTickets}</></div>
            <div><>Total pot: {pot}</></div>
            { winner ?
                <button onClick={() => client.pickWinner()}>Pick Winner</button>
                :
                <p><>Winning ticket: {winner}</></p>
            }
        </>}
    </div>)
}

const Player = () => {
    const { client, hasTicket, winner } = useLottery();
    const { address } = useAccount();
    if (!client) return <></>;

    return (<div>
        <h1>Player Mode</h1>
        { !hasTicket && <button onClick={() => client.getTicket()}>Enter Lottery</button>}
        { hasTicket && <p><>You have a ticket</></p>}
        { winner === address && <div>
            <div>You won!</div>
        </div>}
    </div>)
}


const Dashboard = () => {
    const { isConnected, address } = useAccount()
    const { client, manager } = useLottery();

    useEffect(() => {
        if (!client) return undefined;
    }, [client]);

    if (!isConnected) return <></>

    // admin mode if we have not created a lottery yet, or if we are the lottery authority
    const isAdminMode = manager === address;

    return isAdminMode ? <Admin /> : <Player />;
}

const Content = () =>
    <div className="container">
        <ConnectButton />
        <hr />
        <Dashboard />
    </div>

function App() {
    return (
        <div className="App">
            <LotteryProvider>
                <Content />
            </LotteryProvider>
        </div>
    );
}

export default App;
