import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course: { name, parts } }) => {

    const total = parts.reduce((acc, cur) =>  {
        // console.log('accu', acc, 'current', cur)
        return acc + cur.exercises
    }, 0)
    
    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Total total={total} />
        </div>
       
    )
}

export default Course