"use client"

const RoleSelector = ({ currentUser, setCurrentUser, users }) => {
  const handleRoleChange = (e) => {
    const selectedUserId = Number.parseInt(e.target.value)
    const selectedUser = users.find((user) => user.id === selectedUserId)
    setCurrentUser(selectedUser)
  }

  return (
    <div className="flex items-center gap-4 px-8 py-4 bg-purple-200 text-gray-900">
      <select
        value={currentUser.id}
        onChange={handleRoleChange}
        className="px-4 py-2 border border-white/30 rounded-md bg-white/10 text-gray-900 text-sm"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id} className="bg-gray-800 text-white">
            {user.name} ({user.role})
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2 text-sm">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
        <span>{currentUser.name}</span>
      </div>
    </div>
  )
}

export default RoleSelector
