import React, { useMemo } from "react";
import { getApolloContext } from "@apollo/react-common";

export default function MyApolloProvider({ client, children }) {
  const ApolloContext = getApolloContext();
  const value = useMemo(() => ({ client }), [client]);
  return (
    <ApolloContext.Provider value={value}>{children}</ApolloContext.Provider>
  );
}
