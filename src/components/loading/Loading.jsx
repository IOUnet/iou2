import React from "react";
import { useAccount } from "wagmi";

const Loading = ({ children }) => {
  const { address, isConnecting } = useAccount();

  // Show loading state while wallet is connecting
  if (isConnecting) {
    return "Connecting Wallet...";
  }

  // Render children regardless of wallet connection so read-only routes work
  return <>{children}</>;
};

export default Loading;
