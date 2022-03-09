import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Country from "../Contry/Country";
import FilterBar from "../FilterBar/FilterBar";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import SearchCountryName from "../SearchCountryName/SearchCountryName";

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      continent {
        name
      }
    }
  }
`;

type Countries = {
  countries?: CountriesEntity[] | null;
};

type CountriesEntity = {
  name: string;
  code: string;
  continent: Continent;
};

type Continent = {
  name: string;
};

const CountriesList: React.FC = () => {
  const { loading, error, data } = useQuery<Countries>(LIST_COUNTRIES);
  const [continent, setContinent] = useState<string>("");
  const [countryName, setCountryName] = useState<string>("");

  if (error) new Error(error.message);

  const handleContinentFilter = (continent: string) => {
    setContinent(continent);
  };

  const renderCountries = () => {
    return data?.countries
      ?.filter((country) =>
        continent ? country.continent.name === continent : true
      )
      .filter((country) =>
        countryName
          ? country.name.toLowerCase().includes(countryName.toLowerCase())
          : true
      )
      .map((country, index) => (
        <Country key={index} name={country.name} code={country.code} />
      ));
  };

  return (
    <MainWrapper>
      <SelectBarWrapper>
        <FilterBar handleContinentFilter={handleContinentFilter} />
      </SelectBarWrapper>
      <SearchCountryName setCountryName={setCountryName} />
      <CountriesWrapper>
        {loading ? <ClipLoader /> : renderCountries()}
      </CountriesWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CountriesWrapper = styled.div`
  width: 90vw; 
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
`;

const SelectBarWrapper = styled.div`
  width: 40vw;
  margin: 20px;
`;

export default CountriesList;
