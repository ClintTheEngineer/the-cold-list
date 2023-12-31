import React, { useState, useEffect } from 'react';

const TodoList = ({ username, refresh }) => {
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  
 username = localStorage.getItem('username');

 useEffect(() => {
  if (refresh) {
    fetch('https://filthy-sweatshirt-boa.cyclic.app/todos') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const filteredTodos = data.filter((todo) => todo.username === username);
        setTodos(filteredTodos);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
}, [username, refresh]);

useEffect(() => {
  fetch('https://filthy-sweatshirt-boa.cyclic.app/todos') 
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const filteredTodos = data.filter((todo) => todo.username === username);
      setTodos(filteredTodos);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}, [username]);

  
const handleDeleteTodo = async (todoId) => {
  const shouldDelete = window.confirm('Are you sure you want to delete this to-do?');
  if (!shouldDelete) {
    return;
  }
    try {
      const response = await fetch(`https://filthy-sweatshirt-boa.cyclic.app/deleteTodo/${todoId}`, {
        method: 'DELETE',
      });
     setTodos(todos.filter((todo) => todo.id !== todoId))
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }      
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  
  const handleEditTodo = (todoId, taskName) => {
    setEditMode(true);
    setEditTodoId(todoId);
    setEditedTaskName(taskName);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditTodoId(null);
    setEditedTaskName('');
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`https://filthy-sweatshirt-boa.cyclic.app/editTodos/${editTodoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_name: editedTaskName }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedTodos = [...todos];
      const editedTodoIndex = updatedTodos.findIndex((todo) => todo.id === editTodoId);
      if (editedTodoIndex !== -1) {
        updatedTodos[editedTodoIndex].task_name = editedTaskName;
        setTodos(updatedTodos);
      }
      handleCancelEdit();
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };  
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className='list-map'>
            {editMode && editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <button className='edit-btn' onClick={() => handleEditTodo(todo.id, todo.task_name)}>Edit</button>
                {todo.task_name}
                <button className='delete-btn' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;