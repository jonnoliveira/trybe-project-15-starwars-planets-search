import React from 'react';
import Header from './components/Header';
import Table from './components/Table';
import './App.css';
import InputFilterProvider from './context/InputFilterProvider';

function App() {
  return (
    <InputFilterProvider>
      <Header />
      <Table />
    </InputFilterProvider>

  );
}

export default App;
