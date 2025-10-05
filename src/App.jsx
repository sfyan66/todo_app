import React, { useRef } from "react";
import { useState, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
const dfState = {
    tasks: []
}
function App() {
    const [htheme, setHtheme] = useState('hdark')
    const [ftheme, setFtheme] = useState('fdark')
    const [btnth, setbtnth] = useState('dark')
    const changtheme = () => {
        setHtheme(htheme === "hdark" ? "hlight" : "hdark");
        setFtheme(htheme === "hdark" ? "flight" : "fdark");
        setbtnth(htheme === "hdark" ? "light" : "dark");
    };
    const [task, setTask] = useState({title: '', stat: true});
    const focuss = useRef(null);
    const [state, dispatch] = useReducer(reducer, dfState);
    const [count, setCount] = useState(0);
    const [heigh, setHeigh] = useState(200)
    const counter = () => {
        var number = 0;
        state.tasks.map((t) => 
            t.stat === true ? number++ : number 
        );
        setCount(number);
    }
    const heightt = () => {
        const hh = state.tasks.length;
        var number = 200 + hh * 65.67
        setHeigh(number);
    }
    useEffect(() => {
        counter();
        heightt();
    })
    const submitt = () => {
        if(task.title){
            const newTask = {...task, id: Date.now()};
            dispatch({type:'ADD_TASK', payload: newTask });
            setTask({title:'', stat:true});
            focuss.current.focus();
        };
    };
    const url = "http://localhost:5000/tasks";
    useEffect(() => {
        fetch(url)
            .then((rsp) => rsp.json())
            .then((tasks) => {
                dispatch({type:'LOADTASKS', payload: tasks})
            })
            .catch((error) => console.log("error fetch", error))
    }, [])
    useEffect(() => {
        if(state.tasks.length >= 1){
            fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(state.tasks)
            })
        }
    }, [state.tasks]);
    return (
        <>
            <header className={htheme}>
                <div className="container">
                    <h1>TODO</h1>
                    <button 
                        className={btnth} 
                        onClick={changtheme}
                    ></button>
                </div>
            </header>
            <footer className={ftheme} style={{height: `${heigh}px`}}>
                <div className="container">
                <div className="box" id="box1">
                    <button type="submit" onClick={submitt}></button>
                    <input
                        type="text"
                        placeholder="Create a new todo" value={task.title}
                        onChange={(e) => setTask({...task, title: e.target.value})}
                        ref={focuss}
                        />
                </div>
                <div className="boxs">
                    {state.tasks.map((task) => {
                        return (
                        <div className={task.stat ? 'box active' : 'box finished' }key={task.id}>
                            <button 
                            onClick={() => 
                            dispatch({type:'UPDATE', payload: task.id})}
                            ></button>
                            <p onClick={() => 
                                dispatch({type:'UPDATE', payload: task.id})
                            }>{task.title}</p>
                            <i className="remove" style={{cursor: 'pointer'}} onClick={() => 
                                dispatch({type:'REMOVE', payload: task.id})
                            }></i>
                        </div>                   
                        )
                    })}
                </div>
                <div className="box lbox">
                    <ul>
                        <p className="counter">{count}</p>
                        <p className="item" >items left</p>
                        <li className="all">All</li>
                        <li className="activee">Active</li>
                        <li className="comp">Completed</li>
                        <li className="clear">Clear Completed</li>
                    </ul>
                </div>
                <div className="drop">
                    <div className="more">save</div>
                </div>
                </div>
            </footer>
        </>
    )
}

export default App;