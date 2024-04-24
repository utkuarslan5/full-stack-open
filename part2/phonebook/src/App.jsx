import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
      );
      if (confirmUpdate) {
        try {
          const updatedPerson = {
            ...existingPerson,
            number: newPerson.number,
          };
          personService
            .update(existingPerson.id, updatedPerson)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== existingPerson.id ? person : returnedPerson
                )
              );
              setNewPerson({ name: "", number: "" });
            });
        } catch (error) {
          console.error("Error updating person:", error);
        }
      }
    } else {
      try {
        personService.create(newPerson).then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNewPerson({ name: "", number: "" });
        });
      } catch (error) {
        console.error("Error adding person:", error);
      }
    }
  };

  const updatePerson = (id, newName, newNumber) => {
    const personToUpdate = persons.find((person) => person.id === id);
    const updatedPerson = {
      ...personToUpdate,
      name: newName,
      number: newNumber,
    };

    try {
      personService.update(id, updatedPerson).then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
      });
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`);

    if (confirmDelete) {
      try {
        personService.deleteEntry(id).then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        });
      } catch (error) {
        console.error("Error deleting person:", error);
      }
    }
  };

  const handleNameChange = (event) => {
    setNewPerson({ ...newPerson, name: event.target.value });
  };

  const handleNumberChange = (event) => {
    setNewPerson({ ...newPerson, number: event.target.value });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        updatePerson={updatePerson}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
