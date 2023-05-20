import { useContext } from 'react';
import InputFilterContext from '../context/InputFilterContext';
import search from '../assets/search.svg';

import '../css/header.css';

function Header() {
  const {
    text, handleChange, options, setOptions, filterByOptions, optionsList, filters,
    clearFilters, resetFilters, sortedFilters, setCol, setSor,
  } = useContext(InputFilterContext);

  return (
    <header>
      <div className="title-container">
        <h1>Star Wars</h1>
      </div>

      <div className="input-text-conatiner">
        <input
          type="text"
          id="name"
          name="name"
          value={ text }
          onChange={ handleChange }
          data-testid="name-filter"
          placeholder="Dagobah ..."
        />
        <img src={ search } alt="Search icon" />
      </div>

      <div className="filters">
        <label htmlFor="column-filter">
          Coluna
          <select
            id="column-filter"
            name="column-filter"
            onChange={ ({ target }) => (
              setOptions({ ...options, column: target.value })) }
            data-testid="column-filter"
          >

            {
              optionsList.map((option) => (
                <option
                  data-testid="column-options"
                  key={ option }
                  value={ option }
                >
                  { option }
                </option>

              ))
            }
          </select>
        </label>

        <label htmlFor="comparison-filter">
          Operador
          <select
            name="comparison-filter"
            id="comparison-filter"
            onChange={ ({ target }) => (
              setOptions({ ...options, comparison: target.value })) }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>

          </select>
        </label>

        <input
          type="number"
          name="value-filter"
          value={ options.value }
          onChange={ ({ target }) => (
            setOptions({ ...options, value: target.value })) }
          data-testid="value-filter"
        />

        <button
          type="button"
          onClick={ filterByOptions }
          data-testid="button-filter"

        >
          FILTRAR
        </button>

        <button
          type="button"
          onClick={ resetFilters }
          data-testid="button-remove-filters"
        >
          LIMPAR FILTROS
        </button>

        <label htmlFor="column-sort">
          Ordenar
          <select
            name="column-sort"
            id="column-sort"
            onChange={ ({ target }) => setCol(target.value) }
            data-testid="column-sort"
          >

            {
              optionsList.map((option) => (
                <option
                  data-testid="column-options"
                  key={ option }
                  value={ option }
                >
                  { option }
                </option>

              ))
            }
          </select>
        </label>

        <div className="radio">
          <label htmlFor="ASC">
            ASCENDENTE
            <input
              type="radio"
              name="RADIO"
              id="ASC"
              data-testid="column-sort-input-asc"
              value="ASC"
              onChange={ ({ target }) => setSor(target.value) }
            />
          </label>

          <label htmlFor="DESC">
            DESCENDENTE
            <input
              type="radio"
              name="RADIO"
              id="DESC"
              data-testid="column-sort-input-desc"
              value="DESC"
              onChange={ ({ target }) => setSor(target.value) }
            />
          </label>
        </div>

        <button
          type="button"
          onClick={ () => { sortedFilters(); } }
          data-testid="column-sort-button"

        >
          ORDENAR

        </button>
      </div>
      FILTROS  UTILIZADOS:
      {
        filters
          && (
            filters.map(({ column, comparison, value }) => (
              <div key={ column } data-testid="filter">
                <h5>
                  {`${column} ${comparison} ${value}`}
                  <button
                    type="button"
                    name={ column }
                    onClick={ () => { clearFilters(column); } }
                  >
                    X

                  </button>
                </h5>
              </div>
            ))
          )
      }
    </header>
  );
}

export default Header;
