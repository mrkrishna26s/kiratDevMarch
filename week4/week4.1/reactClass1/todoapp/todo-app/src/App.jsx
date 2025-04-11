import React from "react"
import './App.css'

setInterval(() => {
  todo = {
    title: "worship",
    description: " go for worship"
  }
},2000) //this is not updating the DOM correctly 

function App() {
const [todo, settodo] = React.useState(
  {
    title: "krishna",
    description:": krishna is the king",
    id: 1
  }
)
setInterval(() => {
  settodo({
      title: "worship",
      description: " go for worship",
      id: 2
  })
},2000)
  return (
   <>
   {/* entry point of our app */}
   {todo.title}
   <br></br>
   {todo.description}
   {todo.id}
    <h1>hi there ...</h1>
   </>
  )
}

export default App
