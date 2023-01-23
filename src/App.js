import React from 'react';
import Header from './components/Header';
import Table from './components/Table';
import './App.css';
import InputFilterContext from './context/InputFilterContext';
import useHandleFilter from './hooks/useHandleFilter';

function App() {
  const {
    text,
    handleChange,
    dataFiltered, loading, options, setOptions, filterByOptions, optionsList, filters,
    clearFilters, resetFilters } = useHandleFilter('');
  return (
    <InputFilterContext.Provider
      value={
        { loading,
          text,
          handleChange,
          dataFiltered,
          options,
          setOptions,
          filterByOptions,
          optionsList,
          filters,
          clearFilters,
          resetFilters }
      }
    >
      <main>
        <Header />
        <Table />
      </main>
    </InputFilterContext.Provider>
  );
}

export default App;
