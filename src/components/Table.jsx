import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';

function Table() {
  const { data, loading } = useContext(FetchContext);
  return (
    <div>
      {
        !loading
        && (
          <table>
            <thead>
              <tr>
                {
                  data.map((planets) => {
                    const planetsKeys = Object.keys(planets);
                    return planetsKeys.map((keys) => (
                      <th key={ keys }>
                        { keys }
                      </th>
                    ));
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                data.map((planets) => (
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
