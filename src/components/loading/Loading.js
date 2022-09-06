import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
const { useDrizzleState } = drizzleReactHooks;

const Loading = ({ children }) => {
  const drizzleStatus = useDrizzleState((state) => state.drizzleStatus);

  console.log(drizzleStatus);
  if (drizzleStatus.initialized === false) {
    return "Drizzle Loading.....";
  } else {
    return <>{children}</>;
  }
};

export default Loading;
