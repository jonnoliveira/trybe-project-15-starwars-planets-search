import { useState, useEffect } from 'react';
import useFetch from './useFetch';

function useInputFilter(initialState) {
  const { data, loading, error } = useFetch();

  const [text, setText] = useState(initialState);
  const [dataFiltered, setDataFiltered] = useState();
  const [options, setOptions] = useState(
    { column: 'population', comparison: 'maior que', value: '0' },
  );

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
      setDataFiltered(data.filter((planet) => (
        planet[column] === value))); // não passa como number?
    }
    if (comparison === 'menor que') {
      setDataFiltered(data.filter((planet) => (
        planet[column] < +value)));
    }
    if (comparison === 'maior que') {
      setDataFiltered(data.filter((planet) => (
        planet[column] > +value)));
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
    error,
    options,
    setOptions,
    filterByOptions,
  };
}

export default useInputFilter;
