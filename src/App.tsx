import React from "react";
import GlobalStyle from "./globalStyle";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountriesList from "./components/CountriesList/CountriesList";
import CountryPage from "./components/CountryPage/CountryPage";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CountriesList />} />
          <Route path="/:id" element={<CountryPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
