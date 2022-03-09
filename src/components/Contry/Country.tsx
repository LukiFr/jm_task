import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  code: string;
};

const Country: React.FC<Props> = ({ name, code }) => {
  return (
    <StyledLink to={`/${code.toLowerCase()}`}>
      <StyledCountry>
        <p className="countryName">{name}</p>
        <p>{code}</p>
      </StyledCountry>
    </StyledLink>
  );
};

const StyledCountry = styled.div`
  background-color: CornflowerBlue;
  border: 2px solid black;
  border-radius: 15px;
  padding: 15px;
  margin: 10px;
  width: 20vw;

  :hover {
    background-color: DodgerBlue;
  }

  .countryName {
    font-weight: bold;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

export default Country;
