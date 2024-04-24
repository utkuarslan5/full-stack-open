import React, { useState } from "react";

const Filter = ({ searchTerm, handleSearchTermChange }) => {
  return (
    <div>
      search term:{" "}
      <input value={searchTerm} onChange={handleSearchTermChange} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, searchTerm }) => {
  return searchTerm === ""
    ? persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))
    : persons
        .filter(
          (person) =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            searchTerm !== ""
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ));
};

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
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
