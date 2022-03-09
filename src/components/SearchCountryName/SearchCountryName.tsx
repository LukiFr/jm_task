import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

type Props = {
  setCountryName: Dispatch<SetStateAction<string>>;
};

const SearchCountryName: React.FC<Props> = ({ setCountryName }) => {
  return (
    <StyledInput
      placeholder="Type..."
      onChange={(e) => setCountryName(e.target.value)}
    ></StyledInput>
  );
};

const StyledInput = styled.input`
  width: 40vw;
  height: 40px;
  border: 2px solid lightgrey;
  border-radius: 4px;
  margin: 10px 0px 15px;
  text-indent: 6px;
  font-size: 1em;

  ::placeholder {
    font-size: 1em;
    padding: 2px;
  }
`;

export default SearchCountryName;
