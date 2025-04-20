import { useState } from 'react'
import './App.css'

function App() {
  const [todoforToday, settodoforToday] = useState({
    title: "go to gym",
    description:"hit the gym at 7 o, clock",
    id: 1
  });
  setInterval(()=>{
    settodoforToday({
      title: "Reading time",
      description: "time to study begins, lets start learning",
      id: 1
    })
  }, 1000)

  return (
    <>
    {/* {todoforToday.title}
    <br></br>
    {todoforToday.description} */}
    <RenderTodo todoforToday = {todoforToday}></RenderTodo>
    </>
  )
}
function RenderTodo(props){
return <div>
  {props.todoforToday.title}
  <br></br>
  {props.todoforToday.description}
</div>
}

export default App
