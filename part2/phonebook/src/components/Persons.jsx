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

export default Persons;