import React, { useEffect } from 'react'

function App() {
  const [todo, settodo] = React.useState([{
    title: "go to gym",
    description:"hit the gym at 7 o, clock",
    id: 1},
    {
        title: "go to class",
        description: "go to present in class",
        id : 2
    }
]);
//   setInterval(()=>{
//     settodoforToday({
//       title: "Reading time",
//       description: "time to study begins, lets start learning",
//       id: 1
//     })
//   }, 1000)

  return (
    <>
       {todo.map((todos) => {
        return <todo title ={todo.title} description= {todo.description}></todo>
       })}
    </>
  )
}

export default App