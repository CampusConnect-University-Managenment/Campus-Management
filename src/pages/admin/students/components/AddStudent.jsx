import React, { useState } from 'react';

const AddStudent = ({ onClose, onAddStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    degree: '',
    year: '',
    semester: '',
    status: 'Active',
    avatar: '',
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setAvatarPreview(imageUrl);
        setFormData({ ...formData, avatar: imageUrl });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddStudent) {
      onAddStudent(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-2xl relative">
        <h2 className="text-xl font-semibold mb-4">Add New Student</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="degree"
            placeholder="Degree"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="semester"
            placeholder="Semester"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Graduated">Graduated</option>
          </select>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Profile Picture</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="block"
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Preview"
                className="mt-2 h-20 w-20 object-cover rounded-full"
              />
            )}
          </div>

          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AddStudent;
