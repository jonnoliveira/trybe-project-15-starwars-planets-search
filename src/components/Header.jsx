import { useContext } from 'react';
import InputFilterContext from '../context/InputFilterContext';

function Header() {
  const {
    text, handleChange, options, setOptions, filterByOptions,
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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
      </div>
    </header>
  );
}

export default Header;
