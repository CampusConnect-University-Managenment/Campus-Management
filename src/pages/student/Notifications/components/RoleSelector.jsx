import React from 'react';

const RoleSelector = ({ currentUser, setCurrentUser, users }) => {
  const handleRoleChange = (e) => {
    const selectedUserId = parseInt(e.target.value);
    const selectedUser = users.find(user => user.id === selectedUserId);
    setCurrentUser(selectedUser);
  };

  return (
    <div className="role-selector">
      <select value={currentUser.id} onChange={handleRoleChange}>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.role})
          </option>
        ))}
      </select>
      <div className="user-info">
        <div className="user-avatar">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
        <span>{currentUser.name}</span>
      </div>
    </div>
  );
};

export default RoleSelector;