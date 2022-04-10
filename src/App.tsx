import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DetailPage from './pages/DetailPage';

import Home from './pages/Home';

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [fetchCounter, setFetchCounter] = useState<number>(1);

  useEffect(() => {
    if (fetchCounter <= 150) {
      const fetchData = async () => {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${fetchCounter}`
        );
        const resData = res.data;

        setPokemonList([...pokemonList, resData]);
        setFetchCounter(prev => prev + 1);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCounter]);

  return (
    <>
      <h1>Poke World</h1>
      <Routes>
        <Route path="/" element={<Home pokemonList={pokemonList} />} />
        {pokemonList.map(pokemon => (
          <Route path={`/pokemon${pokemon.id}`} element={<DetailPage />} />
        ))}
      </Routes>
    </>
  );
};

export default App;
