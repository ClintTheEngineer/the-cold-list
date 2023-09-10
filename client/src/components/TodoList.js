import React, { useState, useEffect } from 'react';

function TodoList({ username }) {
  const [todos, setTodos] = useState([]);
  

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
  
  const handleDeleteTodo = async (todoId) => {
    try {
      // Send a DELETE request to your server endpoint with the todoId
      const response = await fetch(`/deleteTodo/${todoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // After successful deletion, update the todos list
      // updateTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task_name}<button onClick={() => handleDeleteTodo(todo.id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;