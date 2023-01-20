import { useEffect, useState } from 'react';

export default function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchPlanets = () => {
    setLoading(true);
    fetch('https://swapi.dev/api/planets')
      .then((planets) => planets.json())
      .then((planets) => planets.results.map((planet) => {
        delete planet.residents;
        setData(planets.results);
        return setLoading(false);
      }))
      .catch((err) => setError(err));
  };

  useEffect(() => {
    searchPlanets();
  }, []);

  return {
    searchPlanets, data, loading, error,
  };
}
