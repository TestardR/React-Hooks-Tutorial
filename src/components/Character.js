import React, { memo } from 'react';
import { useHttp } from '../hooks/http';

import Summary from './Summary';

const Character = props => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== props.selectedChar ||
  //     nextState.loadedCharacter.id !== state.loadedCharacter.id ||
  //     nextState.isLoading !== state.isLoading
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== props.selectedChar) {
  //     fetchData();
  //   }
  // }

  // Redundant with the one below
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const [isLoading, fetchedData] = useHttp(
    'https://swapi.co/api/people/' + props.selectedChar,
    [props.selectedChar]
  );

  let loadedCharacter = null;

  if (fetchedData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }

  // useEffect(() => {
  //   fetchData();
  // }, [props.selectedChar]);

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  // useEffect(() => {
  //   return () => {
  //     console.log('Cleaning up...');
  //   };
  // });

  console.log('rendering');

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default memo(Character); // Do not rerender if props did not change, see connsole.log('rendering')
