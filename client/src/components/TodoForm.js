import React, { useState } from 'react';
import { Constants } from './Constants';


const TodoForm = ({ username, refreshTodoList }) => {
  const [newTodo, setNewTodo] = useState('');
  
  username = localStorage.getItem('username');

  const handleTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      try {
        const data = {
          username: username,
          task_name: newTodo.trim(),
        };
        const response = await fetch(`${Constants.SERVER_URL}/${username}/todos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setNewTodo('');
        refreshTodoList();
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
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
        onKeyUp={handleKeyPress}
      />
      <button id='addTodo-btn' onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default TodoForm;