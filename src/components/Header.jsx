import { useContext } from 'react';
import InputFilterContext from '../context/InputFilterContext';

function Header() {
  const {
    text, handleChange, options, setOptions, filterByOptions, optionsList, filters,
    clearFilters, resetFilters, sortedFilters, setCol, setSor,
  } = useContext(InputFilterContext);

  return (
    <header>
      <h1>Star Wars - Planets Search</h1>

      <div>
        <label htmlFor="name">
          TEXTO:
          <input
            type="text"
            name="name"
            value={ text }
            onChange={ handleChange }
            data-testid="name-filter"
          />
        </label>
      </div>

      <div>
        <select
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

        <select
          name="comparison-filter"
          onChange={ ({ target }) => (
            setOptions({ ...options, comparison: target.value })) }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>

        </select>

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

        <select
          name="column-sort"
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
        <label htmlFor="ASC">
          <input
            type="radio"
            name="RADIO"
            id="ASC"
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ ({ target }) => setSor(target.value) }
          />
          ASCENDENTE
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            name="RADIO"
            id="DESC"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ ({ target }) => setSor(target.value) }
          />
          DESCENDENTE
        </label>

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
