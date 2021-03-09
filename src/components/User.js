import { useState } from "react";

import Todo from "./Todo";

function User({ data, handleNameOnSubmit }) {
    const [userName, setUserName] = useState(data.name);
    const [showUserInput, setShowUserInput] = useState(false);
    const [showTodos, setShowTodos] = useState(false);
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [hasFetchedTodos, setHasFetchedTodos] = useState(false);

    function handleNameDoubleClick() {
        setShowUserInput(showUserInput => !showUserInput);
    }

    function handleNameOnChange(event) {
        setUserName(event.target.value);
    }

    function handleNameOnKeyUp(event) {
        if (event.keyCode === 13) {
            handleNameOnSubmit(data.id, userName);
            setShowUserInput(showUserInput => !showUserInput);
        }
    }

    function handlePlusOnClick() {
        setShowTodos(showTodo => !showTodo);
        if (!hasFetchedTodos) {
            fetchUserTodo(data.id);
            setHasFetchedTodos(true);
        }
    }

    async function fetchUserTodo(userId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
            const todos = await response.json();
            setTodos(todos);
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div>
            <div className="user">
                <button onClick={handlePlusOnClick}>+</button>
                My name is {showUserInput 
                    ? <input type="text" 
                        value={userName} 
                        onChange={handleNameOnChange} 
                        onKeyUp={handleNameOnKeyUp} 
                    /> 
                    : <strong onDoubleClick={handleNameDoubleClick}>{userName}</strong>
                }, I am <strong>{data.age}</strong>
            </div>
            {showTodos && (
                <div className="todos">
                    {todos.map(todo => <Todo key={todo.id} data={todo} />)}
                </div>
            )}
        </div>
    );
}

export default User;
