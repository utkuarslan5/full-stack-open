// App.jsx

const Header = ({ course }) => {
  console.log(course);
  return <h1>{course.name}</h1>; 
};

const Part = ({ name, exercises }) => {
  console.log(name, exercises);
  return (
    <p>{name} {exercises}</p>
  );
};

const Content = ({ parts }) => {

  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />   
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );
};

const Total = ({ total }) => {
  console.log(total); 
  return (
    <p>Number of exercises {total}</p> 
  );
};

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
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
    ]
  };

  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />  
      <Total total={totalExercises} />
    </div>
  );
}

export default App;
