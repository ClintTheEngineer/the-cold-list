import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const deleteBtn = <button>Delete</button>;

  useEffect(() => {
    fetch('/todos') // Assumes your React app is running on the same host and port as the Node.js server.
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

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