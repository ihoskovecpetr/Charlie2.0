import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  gql
} from "apollo-boost";
import { BatchHttpLink } from "apollo-link-batch-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "apollo-utilities";

import App from "./App";

var GQL_ENDPOINT = `http://localhost:4005/graphql`;
if (process.env.NODE_ENV == "production") {
  GQL_ENDPOINT = `https://${window.location.host}/graphql`;
}
const httpLink = new BatchHttpLink({
  uri: GQL_ENDPOINT,
  headers: {
    authorization: window.localStorage.getItem("token")
  }
});

var WS_ENDPOINT = `ws://localhost:4005/subs`;
if (process.env.NODE_ENV == "production") {
  WS_ENDPOINT = `wss://${window.location.host}/subs`;
}

const wsLink = new WebSocketLink({
  uri: WS_ENDPOINT,
  options: {
    reconnect: true
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = window.localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const defaultOptions = {
  // watchQuery: {
  //   fetchPolicy: "no-cache",
  //   errorPolicy: "ignore"
  // },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  }
};

//const link = httpLink;

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

// const client = new ApolloClient({
//     uri: "http://localhost:8008", cache: new InMemoryCache()
//   });

ReactDOM.hydrate(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
// <Router>
//     <Route component={props => <App {...props} />} />
//   </Router>
