import { useState, useEffect } from 'react';
import useFetch from './useFetch';

function useHandleFilter(initialState) {
  const { data, loading } = useFetch();
  const [text, setText] = useState(initialState);
  const [dataFiltered, setDataFiltered] = useState();
  const [options, setOptions] = useState(
    { column: 'population', comparison: 'maior que', value: '0' },
  );
  const [optionsList, setOptionsList] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period',
    'surface_water']);

  const handleChange = ({ target }) => {
    setText((target.value).toLowerCase());
  };

  const filterByText = async () => {
    setDataFiltered(data);

    if (text) {
      const filtered = data.filter((planet) => (
        ((planet.name).toLowerCase()).includes(text)));
      setDataFiltered(filtered);
    }
  };

  const filterByOptions = () => {
    const { column, comparison, value } = options;
    if (comparison === 'igual a') {
      setDataFiltered(dataFiltered.filter((planet) => planet[column] === value)); // não passa como number?
    } else
    if (comparison === 'menor que') {
      setDataFiltered(dataFiltered.filter((planet) => planet[column] < +value));
    } else
    if (comparison === 'maior que') {
      setDataFiltered(dataFiltered.filter((planet) => planet[column] > +value));
    }
    if (optionsList.includes(column)) {
      const filtered = optionsList.filter((option) => option !== column);
      setOptionsList(filtered);
      setOptions({ ...options, column: filtered[0] });
    }
  };

  useEffect(() => {
    filterByText();
  }, [data, text]);

  return {
    text,
    handleChange,
    dataFiltered,
    loading,
    options,
    setOptions,
    filterByOptions,
    optionsList,
  };
}

useHandleFilter.propTypes = {}.isRequired;

export default useHandleFilter;
