import React, { createContext, useState, useContext } from 'react';

const TypeContext = createContext();

export const useType = () => useContext(TypeContext);

export const TypeProvider = ({ children }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedGenreList, setSelectedGenreList] = useState([]);

  return (
    <TypeContext.Provider
      value={{
        selectedType,
        setSelectedType,
        selectedGenre,
        setSelectedGenre,
        selectedGenreList,
        setSelectedGenreList,
      }}
    >
      {children}
    </TypeContext.Provider>
  );
};
