import React from 'react';
import Header from './components/Header';
import FetchContext from './context/FetchContext';
import './App.css';
import useFetch from './hooks/useFetch';
import Table from './components/Table';

function App() {
  const { searchPlanets, data, loading, error } = useFetch();

  return (
    <FetchContext.Provider value={ { searchPlanets, data, loading, error } }>
      <main>
        <Header />
        <Table />
      </main>
    </FetchContext.Provider>
  );
}

export default App;
