// Header.js
const Header = ({ course }) => <h1>{course}</h1>;

// Part.js
const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
);

// Content.js
const Content = ({ parts }) => {
  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />  
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );
};

// Total.js  
const Total = ({ total }) => 
  <p>Number of exercises {total}</p>;
  
// App.js
const App = () => {

  const course = 'Half Stack application development';
  
  const parts = [
    { 
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7  
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];
  
  const totalExercises = parts.reduce(
    (sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={totalExercises} />
    </div>
  );
}

export default App;
