import React, { useState, useEffect } from "react";
import "./App.css";
import CharacterCard from "./components/CharacterCard";
import { ATTRIBUTE_LIST } from "./consts";
import { saveCharacterData, fetchCharacterData } from "./api";
import { Attributes, Character, CharacterPayload } from "./types";

const App: React.FC = () => {
  const createInitialAttributes = (): Attributes => {
    return ATTRIBUTE_LIST.reduce(
      (acc, attr) => ({
        ...acc,
        [attr]: 10,
      }),
      {} as Attributes
    );
  };

  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const loadCharacterData = async () => {
      const data = await fetchCharacterData();

      if (data && data.body) {
        const loadedCharacters = Array.isArray(data.body.characters)
          ? data.body.characters
          : [data.body];

        const formattedCharacters = loadedCharacters.map(
          (char: any, index: number) => ({
            id: char.id || Date.now() + index,
            attributes: char.characterData
              ? char.characterData.attributes
              : char.attributes,
            skills: char.characterData
              ? char.characterData.skills
              : char.skills,
          })
        );

        setCharacters(formattedCharacters);
      }
    };

    loadCharacterData();
  }, []);

  const handleAddNewCharacter = () => {
    const newCharacter = {
      id: Date.now().toString(),
      attributes: createInitialAttributes(),
      skills: {},
    };
    setCharacters((prev) => [...prev, newCharacter]);
  };

  const handleResetAllCharacters = () => {
    // Added this based on the video
    // Not sure if this is to reset all the currently loaded characters
    // so i set current set characters to blank
    setCharacters([]);
  };

  const handleSaveAllCharacters = async () => {
    const allCharacterData = {
      characters: characters.map((character) => ({
        id: character.id,
        attributes: character.attributes,
        skills: character.skills,
      })),
    };

    await saveCharacterData(allCharacterData);
  };

  const handleSaveCharacter = (characterData: CharacterPayload) => {
    saveCharacterData({ characters: [characterData.characterData] });

    setCharacters((prev) =>
      prev.map((char) =>
        char.id === characterData.id
          ? { ...char, ...characterData.characterData }
          : char
      )
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
        <div className="button-container">
          <button onClick={handleAddNewCharacter}>Add New Character</button>
          <button onClick={handleResetAllCharacters}>
            Reset All Characters
          </button>
          <button onClick={handleSaveAllCharacters}>Save All Characters</button>
        </div>
      </header>
      <div className="character-container">
        {characters.length === 0 ? (
          <div>
            <br />
            Click on Add New Character to add a new character
          </div>
        ) : (
          characters.map((character, index) => (
            <CharacterCard
              key={character.id}
              identifier={index + 1}
              initialAttributes={character.attributes}
              onSave={(data) =>
                handleSaveCharacter({ id: character.id, characterData: data })
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
