import React, { useState } from 'react';

function TodoForm({ username, refreshTodoList }) {
  const [newTodo, setNewTodo] = useState('');
  
  username = localStorage.getItem('username');

  const handleTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      try {
        // Create a data object to send in the request body
        const data = {
          username: username,
          task_name: newTodo.trim(),
        };
  
        // Send a POST request to your server endpoint
        const response = await fetch('/addtodos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        // After successful addition, you can clear the input field and update the todos list
        setNewTodo('');
        refreshTodoList();
        // Optionally, you can trigger a refresh of the todo list in the parent component
        // by calling a function passed as a prop.
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };
  

  return (
    <div>
      <h2>Add New Todo</h2>
      <input
        type="text"
        placeholder="Enter a new todo"
        value={newTodo}
        onChange={handleTodoChange}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default TodoForm;