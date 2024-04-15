"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { WalletProvider } from "@/context/BlockchainContext";
const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#2D242F] text-white select-none flex flex-col justify-between`,
};
export default function Home() {
  return (
    <main className={style.wrapper}>
      <WalletProvider>
        <Header />
        <Main />
        <div />
      </WalletProvider>
    </main>
  );
}
