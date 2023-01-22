import React from 'react';
import Header from './components/Header';
import Table from './components/Table';
import './App.css';
import InputFilterContext from './context/InputFilterContext';
import useInputFilter from './hooks/useInputFilter';

function App() {
  const {
    text,
    handleChange,
    dataFiltered, loading, error, options, setOptions, filterByOptions,
  } = useInputFilter('');

  return (
    <InputFilterContext.Provider
      value={
        { loading,
          error,
          text,
          handleChange,
          dataFiltered,
          options,
          setOptions,
          filterByOptions }
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
