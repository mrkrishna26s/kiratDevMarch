import React from "react"
import './App.css'
// f we are making changes in state variable than we need to tell react 
// conponents dont need to be callred it need to be rendered
setInterval(() => {
  todo = {
    title: "worship",
    description: " go for worship"
  }
},2000) //this is not updating the DOM correctly 

function App() {
const [todo, settodo] = React.useState(//useState contains initial value
  {
    title: "krishna",
    description:": krishna is the king",
    id: 1
  }
)
setInterval(() => {
  settodo({//rerendering after each change in state
      title: "worship",
      description: " go for worship",
      id: 2
  })
},2000)
  return (//rendering 
   <>
   <h1>hi there ...</h1>
   {/* entry point of our app */}
   {todo.title}
   <br></br>
   {todo.description}
   {todo.id}
    <PersonName firstName={todo.title} lastName="Singh"></PersonName>
   </>
  )
}
function PersonName(props){
  return <div>
    {props.firstName} {props.lastName}
  </div>
}

export default App
