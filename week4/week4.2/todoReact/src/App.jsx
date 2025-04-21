import React, {useEffect} from 'react'
import './App.css'

// custom hook
function useTodos(){
    const [todos, settodos] = React.useState([]);
    console.log("render");
    // making it real time: means self updating window
    useEffect(()=>{
        fetch("http://localhost:3002/todos").then((response)=>{
            response.json().then((data)=>{
                console.log(data)
                settodos(data);
            })
        });
        setInterval(()=>{
            fetch("http://localhost:3002/todos").then((response)=>{
                response.json().then((data)=>{
                    console.log(data)
                    settodos(data);
                })
            })
        },200);

    },[]);
    return todos;
}

function App() {
    const todos = useTodos();
//   const [todos, settodos] = React.useState([]);
//     console.log("render");

//     useEffect(()=>{
//         fetch("http://localhost:3002/todos").then((response)=>{
//             response.json().then((data)=>{
//                 console.log(data)
//                 settodos(data);
//             })
//         })
//     },[])
    console.log("rerendering")
  
  return (
    <>
    {todos.map(todo=>{
        return <div>
            {todo.title}
            <br />
            {todo.description}<br/>
            <button>Delete</button>
        </div>
    })}
    </>
  )
}
export default App