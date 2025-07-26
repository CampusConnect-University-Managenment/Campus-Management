import React, { useState } from 'react';

const FacultyForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.email) newErrors.email = 'Email is required';
if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.address) newErrors.address = 'Address is required';

    // Only validate department fields if role is NOT Principal or HOD
    if (!['Principal', 'Head of the Department'].includes(formData.role)) {
      if (!formData.department) newErrors.department = 'Department is required';
      if (!formData.departmentId) newErrors.departmentId = 'Department ID is required';
    }

    if (!formData.facultyId) newErrors.facultyId = 'Faculty ID is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.degree) newErrors.degree = 'Degree is required';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Photo */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
          <input
            type="file"
            onChange={(e) => onChange('photo', e.target.files[0])}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

       

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Age */}
     <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
  <input
    type="date"
    value={formData.dob || ''} // assuming you're using `dob` in formData
    onChange={(e) => onChange('dob', e.target.value)}
    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
  />
  {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
</div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => onChange('address', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
            {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
          <select
            value={formData.bloodGroup}
            onChange={(e) => onChange('bloodGroup', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="">Select Blood Group</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup}</p>}
        </div>

        {/* Gender */}
      <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
  <div className="flex gap-4 mt-2">
    {['Male', 'Female', 'Other'].map((genderOption) => (
      <label key={genderOption} className="flex items-center text-sm text-gray-700">
        <input
          type="radio"
          name="gender"
          value={genderOption}
          checked={formData.gender === genderOption}
          onChange={(e) => onChange('gender', e.target.value)}
          className="mr-2"
        />
        {genderOption}
      </label>
    ))}
  </div>
  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
</div>
 {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            value={formData.role}
            onChange={(e) => onChange('role', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="">Select Role</option>
            {['Principal', 'Head of the Department', 'Assistant Professor', 'Professor', 'Lab Assistant'].map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>
        {/* Department (Conditional) */}
        {!['Principal'].includes(formData.role) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => onChange('department', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="">Select Department</option>
                {['CSE', 'IT', 'ETE', 'EEE', 'ECE', 'MECH', 'CIVIL'].map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
            </div>

            {/* Department ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
              <input
                type="text"
                value={formData.departmentId}
                onChange={(e) => onChange('departmentId', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              {errors.departmentId && <p className="text-red-500 text-sm">{errors.departmentId}</p>}
            </div>
          </>
        )}

        {/* Faculty ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Faculty ID</label>
          <input
            type="text"
            value={formData.facultyId}
            onChange={(e) => onChange('facultyId', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          {errors.facultyId && <p className="text-red-500 text-sm">{errors.facultyId}</p>}
        </div>

       

        {/* Qualification */}
 <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
  <select
    value={formData.degree}
    onChange={(e) => {
      const value = e.target.value;
      onChange('degree', value);
      if (value !== 'Others') {
        onChange('qualification', value); // auto-fill qualification
      } else {
        onChange('qualification', ''); // clear qualification if Others
      }
    }}
    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
  >
    <option value="">Select Degree</option>
    {['BE', 'ME', 'BTech', 'MTech', 'Doctorate', 'Others'].map((deg) => (
      <option key={deg} value={deg}>{deg}</option>
    ))}
  </select>
  {errors.degree && <p className="text-red-500 text-sm">{errors.degree}</p>}

  {formData.degree === 'Others' && (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Enter Other Qualification</label>
      <input
        type="text"
        value={formData.qualification}
        onChange={(e) => onChange('qualification', e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        placeholder="Enter your qualification"
      />
      {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
    </div>
  )}
</div>

      

    


        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
          <input
            type="number"
            value={formData.experience}
            onChange={(e) => onChange('experience', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-6 rounded-md transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-sm text-gray-800 py-2 px-6 rounded-md transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FacultyForm;
