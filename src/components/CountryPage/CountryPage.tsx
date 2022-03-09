import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

type RootObject = {
  country: Country;
}

type Country = {
  name: string;
  code: string;
  emoji: string;
  languages: LanguagesEntity[] | null;
}

type LanguagesEntity = {
  name: string;
};

const CountryPage: React.FC = () => {
  const { id } = useParams();

  const LIST_COUNTRY = gql`
  {
    country(code: "${id?.toUpperCase()}") {
        name,
        code,
        emoji,
        languages {
          name
        }
      }
  }
`;

  const { loading, error, data } = useQuery<RootObject>(LIST_COUNTRY);

  if (error) new Error(error.message);
  if(!loading) {
    console.log(data)
  }

  const renderCountry = () => {
    return (
      <>
        <div>
          <h1>{data?.country.name}</h1>
          <h1>{data?.country.emoji}</h1>
        </div>
        <h1>{data?.country.code}</h1>
        <h3>Languages</h3>
        {data?.country.languages?.map((language, index) => (
          <p key={index}>{language.name}</p>
        ))}
      </>
    );
  };

  return (
    <StyledCountry>{loading ? <ClipLoader /> : renderCountry()}</StyledCountry>
  );
};

const StyledCountry = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  background-color: CornflowerBlue;
  margin: 50px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;

    h1 {
      margin: 5px;
    }
  }

  h3 {
    margin: 10px;
  }
`;

export default CountryPage;
