const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part}/>)}     
  </>

const Course = ({ course, parts }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total sum={parts.reduce((sum, i)=> sum+=i.exercises, 0)} />
    </div>
  )
}

export default Course