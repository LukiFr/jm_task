import React, { useState, Dispatch, SetStateAction } from "react";
import Select from "react-select";
import { useQuery, gql } from "@apollo/client";

const LIST_CONTINENTS = gql`
  {
    continents {
      name
    }
  }
`;

type Props = {
  setContinentName: Dispatch<SetStateAction<string>>;
};

type Continents = {
  continents?: ContinentsEntity[] | [];
};

type ContinentsEntity = {
  name: string;
};

type Options = {
  value: string;
  label: string;
};

const FilterBar: React.FC<Props> = ({ setContinentName }) => {
  const { loading, error, data } = useQuery<Continents>(LIST_CONTINENTS);
  const [options, setOptions] = useState<Options[]>();

  if (error) new Error(error.message);

  if (!loading && !options) {
    setOptions(
      data?.continents?.map((x) => ({ value: x.name, label: x.name }))
    );
  }

  return (
    <Select
      options={options}
      onChange={(e) =>
        e ? setContinentName(e?.value) : setContinentName("")
      }
      isClearable
    />
  );
};

export default FilterBar;
