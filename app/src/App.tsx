import React, {useEffect} from "react";
import {LotteryProvider, useLottery} from "./LotteryContext";
import {useAccount} from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CivicPassProvider } from "./CivicPassContext";
import { GatewayStatus, IdentityButton, useGateway } from "@civic/ethereum-gateway-react";

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
    const { gatewayStatus } = useGateway();
    const { address } = useAccount();
    if (!client) return <></>;

    return (<div>
        <h1>Player Mode</h1>
        <IdentityButton />
        { gatewayStatus !== GatewayStatus.ACTIVE && <div>Verify you are a unique person before entering</div>}
        { !hasTicket && <button disabled={gatewayStatus !== GatewayStatus.ACTIVE} onClick={() => client.getTicket()}>Enter Lottery</button>}
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
            <CivicPassProvider>
                <LotteryProvider>
                    <Content />
                </LotteryProvider>
            </CivicPassProvider>
        </div>
    );
}

export default App;
