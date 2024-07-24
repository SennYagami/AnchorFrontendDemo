import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { AppBar } from "../components/AppBar";
import { useWallet } from "@solana/wallet-adapter-react";
import { Initialize } from "../components/Initialize";
import { useState } from "react";
import Head from "next/head";
import { Spacer, Text, Box, Stack, Link } from "@chakra-ui/react";
import { Connection } from "@solana/web3.js";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import idl from "../assets/bond.json";

const Home: NextPage = (props) => {
  const [transactionUrl, setTransactionUrl] = useState("");
  const wallet = useWallet();

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  const provider = new AnchorProvider(connection, wallet);
  const program = new Program(idl as Idl, provider);

  return (
    <div className={styles.App}>
      <Head>
        <title>Anchor Frontend Example</title>
      </Head>
      <Box h="calc(100vh)" w="full">
        <Stack w="full" h="calc(100vh)" justify="center">
          <AppBar />
          <div className={styles.AppBody}>
            {wallet.connected ? (
              <Initialize setTransactionUrl={setTransactionUrl} />
            ) : (
              <Text color="white">Connect Wallet</Text>
            )}
            <Spacer />
            {transactionUrl && (
              <Link href={transactionUrl} color="white" isExternal margin={8}>
                View most recent transaction
              </Link>
            )}
          </div>
        </Stack>
      </Box>
    </div>
  );
};

export default Home;
