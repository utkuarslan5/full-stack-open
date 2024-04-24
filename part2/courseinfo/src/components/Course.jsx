// Course.jsx

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <li>
      {name} {exercises}
    </li> 
  );
};

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />  
      )}
    </ul>
  );
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>; 
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((s, p) => s + p.exercises, 0)} />
    </div>
  );
};

export default Course;