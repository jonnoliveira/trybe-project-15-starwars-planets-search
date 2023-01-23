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
                      {
                        Object.values(planets).map((value) => (
                          <td key={ value }>{value}</td>
                        ))
                      }
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
