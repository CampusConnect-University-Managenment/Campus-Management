import React from "react";

const FacultyForm = ({
    newFaculty,
    setNewFaculty,
    isEditing,
    handleSubmit
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <input
                type="text"
                placeholder="Name"
                className="border rounded p-2 col-span-1"
                value={newFaculty.name}
                onChange={e => setNewFaculty({ ...newFaculty, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Title"
                className="border rounded p-2 col-span-1"
                value={newFaculty.title}
                onChange={e => setNewFaculty({ ...newFaculty, title: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                className="border rounded p-2 col-span-1"
                value={newFaculty.email}
                onChange={e => setNewFaculty({ ...newFaculty, email: e.target.value })}
            />
            <input
                type="text"
                placeholder="Department"
                className="border rounded p-2 col-span-1"
                value={newFaculty.department}
                onChange={e => setNewFaculty({ ...newFaculty, department: e.target.value.toUpperCase() })}
            />
            <input
                type="number"
                placeholder="Attendance %"
                className="border rounded p-2 col-span-1"
                value={newFaculty.attendance}
                onChange={e => setNewFaculty({ ...newFaculty, attendance: e.target.value })}
            />
            <button
                className="bg-purple-600 text-white rounded px-4 py-2 mt-2 md:col-span-5"
                onClick={handleSubmit}
            >
                {isEditing ? "Update Faculty" : "Add Faculty"}
            </button>
        </div>
    );
};

export default FacultyForm;
