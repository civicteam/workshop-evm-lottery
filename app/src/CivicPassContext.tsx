import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {GatewayProvider} from "@civic/ethereum-gateway-react";
import {useAccount} from "wagmi";
import {Wallet} from "ethers";

const UNIQUENESS_PASS = "uniqobk8oGh4XBLMqM68K8M2zNu3CdYX7q5go7whQiv";

export const CivicPassProvider: FC<PropsWithChildren> = ({ children }) => {
  const { connector } = useAccount();
  const [wallet, setWallet] = useState<Wallet>();
  useEffect(() => {
    if (!connector) return;
    connector.getSigner().then(setWallet);
  }, [connector]);

  return <GatewayProvider
    wallet={wallet}
    gatekeeperNetwork={UNIQUENESS_PASS}
  >
    {children}
  </GatewayProvider>;
}