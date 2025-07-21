import React from 'react';

const departments = ['CSE', 'IT', 'EEE', 'ECE', 'MECH', 'CIVIL'];

const FacultyForm = ({ formData, setFormData, onSubmit, onCancel }) => {
  const isEditMode = formData.id !== null;

  return (
    <form
      onSubmit={onSubmit}
      className="border p-4 rounded-xl shadow-md space-y-4 bg-gray-50"
    >
      <h3 className="text-lg font-semibold">
        {isEditMode ? 'Edit Faculty' : 'Add New Faculty'}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          step="0.1"
          placeholder="Attendance %"
          value={formData.attendance}
          onChange={(e) =>
            setFormData({ ...formData, attendance: e.target.value })
          }
          required
          className="p-2 border rounded"
        />
        <select
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
          className="p-2 border rounded"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isEditMode ? 'Update' : 'Add'}
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FacultyForm;
