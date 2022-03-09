import React, { useState } from "react";
import Select from "react-select";
import { useQuery, gql } from "@apollo/client";
import { isCompositeType } from "graphql";

const LIST_CONTINENTS = gql`
  {
    continents {
      name
    }
  }
`;

type Props = {
  handleContinentFilter: (continent: string) => void;
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

const FilterBar: React.FC<Props> = ({ handleContinentFilter }) => {
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
        e ? handleContinentFilter(e?.value) : handleContinentFilter("")
      }
      isClearable
    />
  );
};

export default FilterBar;
