const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => 
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ total }) => <p><strong>total of {total} exercises</strong></p>

const Course = ({ course: { name, parts } }) => {

    const total = parts.reduce((acc, cur) =>  {
        // console.log('accu', acc, 'current', cur)
        return acc + cur.exercises
    }, 0)

    return (
        <div>
            <h2>{name}</h2>
            <Content parts={parts} />
            <Total total={total} />
        </div>
             
    )
}

export default Course