/* eslint-disable react-hooks/exhaustive-deps */
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

  const [filters, setFilters] = useState([]);
  const [restore, setRestore] = useState(false);
  const [col, setCol] = useState('population');
  const [sor, setSor] = useState('ASC');
  const [sorted, setSorted] = useState({ order: { column: '', sort: '' } });

  // ========== FUNCTIONS ========== //

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
    }
    if (comparison === 'menor que') {
      setDataFiltered(dataFiltered.filter((planet) => planet[column] < +value));
    }
    if (comparison === 'maior que') {
      setDataFiltered(dataFiltered.filter((planet) => planet[column] > +value));
    }
    if (optionsList.includes(column)) {
      const filtered = optionsList.filter((option) => option !== column);
      setOptionsList(filtered);
      setOptions({ ...options, column: filtered[0] });
    }
    setFilters([...filters, options]);
  };

  const restoreFilters = () => {
    setDataFiltered(data);
    filters.forEach(({ column, comparison, value }) => {
      if (comparison === 'igual a') {
        setDataFiltered(data.filter((planet) => planet[column] === value));
      }
      if (comparison === 'menor que') {
        setDataFiltered(data.filter((planet) => planet[column] < +value));
      }
      if (comparison === 'maior que') {
        setDataFiltered(data.filter((planet) => planet[column] > +value));
      }
    });
    setRestore(false);
  };

  const clearFilters = (param) => {
    const remainingFilters = filters.filter((filter) => filter.column !== param);
    setFilters(remainingFilters);
    setOptionsList([...optionsList, param]);
    setRestore(true);
  };

  const resetFilters = () => {
    setFilters([]);
    setDataFiltered(data);
    setOptionsList([
      'population', 'orbital_period', 'diameter', 'rotation_period',
      'surface_water']);
  };

  const sortedFilters = () => {
    const newData = (data.filter((planet) => (planet[col] !== 'unknown')));
    const unknown = data.filter((planet) => (
      planet[col] === 'unknown'));

    if (sor === 'ASC') {
      newData.sort((a, b) => a[col] - b[col]);
      const planets = [...newData, ...unknown];
      setDataFiltered(planets);
    }
    if (sor === 'DESC') {
      newData.sort((a, b) => b[col] - a[col]);
      const planets = [...newData, ...unknown];
      setDataFiltered(planets);
    }
    setSorted({ order: { column: col, sort: sor } });
  };

  useEffect(() => {
    filterByText();
  }, [data, text]);

  useEffect(() => {
    restoreFilters();
  }, [restore]);

  return {
    text,
    handleChange,
    dataFiltered,
    loading,
    options,
    setOptions,
    filterByOptions,
    optionsList,
    filters,
    clearFilters,
    resetFilters,
    sorted,
    setSorted,
    sortedFilters,
    setCol,
    setSor,
  };
}

useHandleFilter.propTypes = {}.isRequired;

export default useHandleFilter;
