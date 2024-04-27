import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        setErrorMessage(`Error fetching persons: ${error.message}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
              setErrorMessage(`Updated ${returnedPerson.name}'s number`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            })
            .catch((error) => {
              setErrorMessage(`Error updating person: ${error.message}`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            });
        } catch (error) {
          console.error("Error updating person:", error);
        }
      }
    } else {
      try {
        personService
          .create(newPerson)
          .then((createdPerson) => {
            setPersons(persons.concat(createdPerson));
            setNewPerson({ name: "", number: "" });
            setErrorMessage(`Added ${createdPerson.name}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(`Error adding person: ${error.message}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      } catch (error) {
        console.error("Error adding person:", error);
        setErrorMessage(`Error adding person: ${error.message}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
      personService
        .update(id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );
          setErrorMessage(`Updated ${returnedPerson.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`Error updating person: ${error.message}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } catch (error) {
      console.error("Error updating person:", error);
      setErrorMessage(`Error updating person: ${error.message}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`);

    if (confirmDelete) {
      try {
        personService
          .deleteEntry(id)
          .then(() => {
            setPersons(persons.filter((person) => person.id !== id));
            setErrorMessage(`Deleted ${personToDelete.name}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(`Error deleting person: ${error.message}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      } catch (error) {
        console.error("Error deleting person:", error);
        setErrorMessage(`Error deleting person: ${error.message}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
      <Notification message={errorMessage} />
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
