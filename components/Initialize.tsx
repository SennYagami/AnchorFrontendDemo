import { useConnection, useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { FC, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import idl from "../assets/bond.json";
import { ethers } from "ethers";

export interface Props {
  setTransactionUrl;
}

export const Initialize: FC<Props> = ({ setTransactionUrl }) => {
  const [program, setProgram] = useState<Program>();

  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  useEffect(() => {
    let provider: AnchorProvider;

    provider = new AnchorProvider(connection, wallet, {});
    anchor.setProvider(provider);

    const program = new Program(idl as Idl, provider);

    setProgram(program);
  }, [connection, wallet]);

  const onClick = async () => {
    const msg = ethers.getBytes(ethers.keccak256(ethers.toUtf8Bytes("Hello")));
    const sig = await program.methods.verifyCallWithParam2([...msg]).rpc();

    setTransactionUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
  };

  return <Button onClick={onClick}>Send Tx</Button>;
};
