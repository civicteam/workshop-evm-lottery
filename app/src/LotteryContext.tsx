import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import {useAccount, useSigner} from "wagmi";
import {Lottery, Lottery__factory} from "./typechain-types";
import {ethers} from "ethers";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || "";

type LotteryContextType = {
  client: Lottery | undefined;
  manager: string | undefined;
  hasTicket: boolean;
  winner: string | undefined;
  totalTickets: number;
  pot: string | undefined;
}
export const LotteryContext = createContext<LotteryContextType>({
  client: undefined,
  manager: undefined,
  hasTicket: false,
  winner: undefined,
  totalTickets: 0,
  pot: undefined,
});

export const LotteryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [client, setClient] = useState<Lottery | undefined>();
  const [ manager, setManager ] = useState<string>();
  const [ hasTicket, setHasTicket ] = useState(false);
  const [ winner, setWinner ] = useState<string>();
  const [ totalTickets, setTotalTickets ] = useState<number>(0);
  const [ pot, setPot ] = useState<string>();

  // set up the lottery details in the UI
  const updateState = (client: Lottery) => {
    if (!address) return undefined;
    client.manager().then(setManager);
    client.uniquePlayers(address).then(setHasTicket);
    client.winner().then(setWinner);
    client.totalPlayers().then((total) => setTotalTickets(total.toNumber()));
    client.getBalance().then((balance) => {
      const etherValue = ethers.utils.formatUnits(balance, 'ether');
      setPot(etherValue);
    });
  }

  useEffect(() => {
    if (!signer || !address) return undefined;
    const lottery = Lottery__factory.connect(
        contractAddress,
        signer
    );
    setClient(lottery)
    updateState(lottery);
  }, [signer, address]);

  return (
      <LotteryContext.Provider value={{ client, manager, hasTicket, winner, totalTickets, pot }}>
        {children}
      </LotteryContext.Provider>
  );
}

export const useLottery = () => useContext(LotteryContext);