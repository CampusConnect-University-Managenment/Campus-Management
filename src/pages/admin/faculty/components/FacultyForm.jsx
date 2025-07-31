import React, { useState } from 'react';

const FacultyForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  departmentOptions = [],
  roleOptions = [],
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
    if (!['Principal', 'Head of the Department'].includes(formData.role)) {
      if (!formData.department) newErrors.department = 'Department is required';
      if (!formData.departmentId) newErrors.departmentId = 'Department ID is required';
    }
    if (!formData.facultyCode) newErrors.facultyCode = 'Faculty code is required';
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
    if (validate()) onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Photo Upload */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
          <input
            type="file"
            onChange={(e) => onChange('photo', e.target.files[0])}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>

        {/* First Name */}
        <InputField label="First Name" value={formData.firstName} error={errors.firstName} onChange={val => onChange('firstName', val)} />

        {/* Last Name */}
        <InputField label="Last Name" value={formData.lastName} error={errors.lastName} onChange={val => onChange('lastName', val)} />

        {/* Phone */}
        <InputField label="Phone" value={formData.phone} error={errors.phone} onChange={val => onChange('phone', val)} />

        {/* Email */}
        <InputField label="Email" type="email" value={formData.email} error={errors.email} onChange={val => onChange('email', val)} />

        {/* DOB */}
        <InputField label="Date of Birth" type="date" value={formData.dob || ''} error={errors.dob} onChange={val => onChange('dob', val)} />

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
        <SelectField
          label="Blood Group"
          value={formData.bloodGroup}
          options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
          error={errors.bloodGroup}
          onChange={val => onChange('bloodGroup', val)}
        />

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <div className="flex gap-4 mt-2">
            {['Male', 'Female', 'Other'].map(gender => (
              <label key={gender} className="flex items-center text-sm text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={e => onChange('gender', e.target.value)}
                  className="mr-2"
                />
                {gender}
              </label>
            ))}
          </div>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        {/* Role */}
        <SelectField
          label="Role"
          value={formData.role}
          options={roleOptions.length ? roleOptions : ['Principal', 'Head of the Department', 'Assistant Professor', 'Professor', 'Lab Assistant']}
          error={errors.role}
          onChange={val => onChange('role', val)}
        />

        {/* Department & Department ID (Conditional) */}
        {!['Principal'].includes(formData.role) && (
          <>
            <SelectField
              label="Department"
              value={formData.department}
              options={departmentOptions}
              error={errors.department}
              onChange={val => onChange('department', val)}
            />
            <InputField
              label="Department ID"
              value={formData.departmentId}
              error={errors.departmentId}
              onChange={val => onChange('departmentId', val)}
            />
          </>
        )}

        {/* Faculty Code */}
        <InputField
          label="Faculty Code"
          value={formData.facultyCode}
          error={errors.facultyCode}
          onChange={val => onChange('facultyCode', val)}
        />

        {/* Qualification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
          <select
            value={formData.degree}
            onChange={(e) => {
              const value = e.target.value;
              onChange('degree', value);
              if (value !== 'Others') onChange('qualification', value);
              else onChange('qualification', '');
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="">Select Degree</option>
            {['BE', 'ME', 'BTech', 'MTech', 'Doctorate', 'Others'].map(deg => (
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
                onChange={e => onChange('qualification', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Enter your qualification"
              />
              {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
            </div>
          )}
        </div>

        {/* Experience */}
        <InputField
          label="Years of Experience"
          type="number"
          value={formData.experience}
          error={errors.experience}
          onChange={val => onChange('experience', val)}
        />
      </div>

      {/* Buttons */}
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

// Reusable Text Input
const InputField = ({ label, value, onChange, error, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

// Updated SelectField to support options with label and value
const SelectField = ({ label, value, options, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        typeof opt === 'object'
          ? <option key={opt.value} value={opt.value}>{opt.label}</option>
          : <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default FacultyForm;
