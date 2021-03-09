import React, { useState, useEffect } from 'react';

import './App.css';

import User from './components/User';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  /**
   * Generate a random age in [20, 30]
   */
  function generateRandomAge() {
    return Math.round(Math.random() * 10) + 20;
  }

  function handleNameOnSubmit(userId, userName) {
      const newUsers = users.map(user => {
        if (user.id === userId) {
          user.name = userName;
        }

        return user;
      });

      setUsers(newUsers);
  }

  async function fetchUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();

      const newUsers = users.map(user => {
        return {
          ...user,
          age: generateRandomAge()
        };
      })

      setUsers(newUsers);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      {users.map(user => <User 
        key={user.id} 
        data={user} 
        handleNameOnSubmit={handleNameOnSubmit} 
      />)}
    </div>
  );
}

export default App;
