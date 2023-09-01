import React, { useState } from 'react';

function TodoForm() {
  const [newTodo, setNewTodo] = useState('');

  const handleTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      // Logic to send the newTodo to the server and add it to the database
      // You can use fetch or axios to make the API request

      // After successful addition, you can clear the input field and update the todos list
      setNewTodo('');
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