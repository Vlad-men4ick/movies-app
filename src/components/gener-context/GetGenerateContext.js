import React from 'react';

const defaultValue = {
  genres: [{ id: 1, name: '' }],
};

const { Provider: GenresProvider, Consumer: GenresConsumer } = React.createContext(defaultValue);

export { GenresProvider, GenresConsumer };
