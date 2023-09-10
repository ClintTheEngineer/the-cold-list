import React, { useState, useEffect } from 'react';

function TodoList({ username }) {
  const [todos, setTodos] = useState([]);
  const deleteBtn = <button>Delete</button>;

 username = localStorage.getItem('username');


  useEffect(() => {
    fetch('/todos') // Assumes your React app is running on the same host and port as the Node.js server.
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Filter todos based on the logged-in user's username
        const filteredTodos = data.filter((todo) => todo.username === username);
        setTodos(filteredTodos);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [username]);

  
  
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task_name}{deleteBtn}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;