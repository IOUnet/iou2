import React from "react";
import { useAccount } from "wagmi";

const Loading = ({ children }) => {
  const { address, isConnecting } = useAccount();

  // Show loading state while wallet is connecting
  if (isConnecting) {
    return "Connecting Wallet...";
  }
  
  // Show loading state while no address is available
  if (!address) {
    return "Please connect your wallet...";
  }

  // If wallet is connected, render children
  return <>{children}</>;
};

export default Loading;