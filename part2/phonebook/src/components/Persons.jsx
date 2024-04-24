const Persons = ({ persons, searchTerm, deletePerson }) => {
  return searchTerm === ""
    ? persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person.id)}>Delete</button>
        </div>
      ))
    : persons
        .filter(
          (person) =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            searchTerm !== ""
        )
        .map((person) => (
          <div key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePerson(person.id)}>Delete</button>
          </div>
        ));
};

export default Persons;
