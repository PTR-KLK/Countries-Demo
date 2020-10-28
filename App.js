import { StatusBar } from "expo-status-bar";
import React from "react";
import Form from "./components/form.component";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries-274616.ew.r.appspot.com",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Form />
      <StatusBar style="auto" />
    </ApolloProvider>
  );
}
