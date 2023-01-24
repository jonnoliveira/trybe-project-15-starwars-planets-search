import React, { useContext } from 'react';
import InputFilterContext from '../context/InputFilterContext';
import useFetch from '../hooks/useFetch';

function Table() {
  const { dataFiltered, loading } = useContext(InputFilterContext);
  const { data, error } = useFetch();

  return (
    <div>
      {
        error
        && (
          <p>Erro na requisição. Tente novamente mais tarde.</p>
        )
      }
      {
        loading
          ? (
            <p>Loading...</p>
          )
          : (
            <table>
              <thead>
                <tr>
                  {
                    Object.keys(data[0]).map((key) => (
                      <th key={ key }>{ key }</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  dataFiltered.map((planets) => (
                    <tr key={ planets.name }>
                      <td
                        data-testid="planet-name"
                      >
                        { planets.name }
                      </td>
                      <td>{ planets.rotation_period }</td>
                      <td>{ planets.orbital_period }</td>
                      <td>{ planets.rotation_period }</td>
                      <td data-testid="planet-diameter">{ planets.diameter }</td>
                      <td>{ planets.climate }</td>
                      <td>{ planets.gravity }</td>
                      <td>{ planets.terrain }</td>
                      <td>{ planets.surface_water }</td>
                      <td>{ planets.population }</td>
                      <td>{ planets.films }</td>
                      <td>{ planets.created }</td>
                      <td>{ planets.edited }</td>
                      <td>{ planets.url }</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
      }
    </div>
  );
}

export default Table;
