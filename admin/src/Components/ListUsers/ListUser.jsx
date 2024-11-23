import React, { useEffect, useState } from 'react';
import './ListUser.css';

const ListUser = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    await fetch('http://localhost:4000/getUsers')
      .then((res) => res.json())
      .then((data) => { setUsers(data); });
  };

  const removeUser = async (userId) => {
    // Gửi yêu cầu DELETE
    await fetch('http://localhost:4000/removeuser', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId }), 
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("User removed successfully!");
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        alert("Failed to remove user");
      }
    })
    .catch((error) => {
      console.error("Error removing user:", error);
      alert("An error occurred while removing the user");
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="list-user">
      <h1>User List</h1>
      <div className='listuser-format-main'>
        <p>Username</p>
        <p>Email</p>
        <p>Registration Date</p>
        <p>Actions</p>
      </div>

      <div className="listuser-allusers">
        <hr />
        {users.map((user, index) => (
          <div key={index} className="listuser-format">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{new Date(user.date).toLocaleDateString()}</p>
            <button onClick={() => removeUser(user._id)}>Delete</button>
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
};

export default ListUser;
