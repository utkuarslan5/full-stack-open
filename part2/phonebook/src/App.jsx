import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const addPerson = (
  event,
  newName,
  newNumber,
  persons,
  setPersons,
  setNewName,
  setNewNumber
) => {
  event.preventDefault();
  const personObject = {
    name: newName,
    number: newNumber,
  };

  if (persons.some((person) => person.name === newName)) {
    alert(`${newName} is already added to phonebook`);
  } else {
    axios
      .post("http://localhost:3001/persons", personObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log("Error adding person:", error);
      });
  }
};

const handleNameChange = (event, setNewName) => {
  setNewName(event.target.value);
};

const handleNumberChange = (event, setNewNumber) => {
  setNewNumber(event.target.value);
};

const handleSearchTermChange = (event, setSearchTerm) => {
  setSearchTerm(event.target.value);
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  console.log("render", persons.length, "persons");

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchTerm={searchTerm}
        handleSearchTermChange={(event) =>
          handleSearchTermChange(event, setSearchTerm)
        }
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={(event) =>
          addPerson(
            event,
            newName,
            newNumber,
            persons,
            setPersons,
            setNewName,
            setNewNumber
          )
        }
        newName={newName}
        newNumber={newNumber}
        handleNameChange={(event) => handleNameChange(event, setNewName)}
        handleNumberChange={(event) => handleNumberChange(event, setNewNumber)}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App;