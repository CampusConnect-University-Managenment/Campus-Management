import React, { useState } from 'react';

// Helper function to format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Reusable input field component
const ProfileInputField = ({ label, value, isEditing, name, type = 'text', onChange, placeholder = '' }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    ) : (
      <p className="text-gray-800 text-base">{value || 'N/A'}</p>
    )}
  </div>
);

// Reusable textarea field component for multi-line text
const ProfileTextAreaField = ({ label, value, isEditing, name, onChange, rows = 3, placeholder = '' }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {isEditing ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      ></textarea>
    ) : (
      <p className="text-gray-800 text-base whitespace-pre-wrap">{value || 'N/A'}</p>
    )}
  </div>
);

// Component for a single row in the Basic Info section (label in one column, value in another)
const BasicInfoRow = ({ label, value, isEditing, name, type = 'text', onChange }) => {
  // Special handling for Birthday to use formatDate if it's a date string
  const displayValue = (label === 'Birthday' && value && value !== 'Your birthday') ? formatDate(value) : (value || 'N/A');

  return (
    <div className="flex flex-col sm:flex-row py-3 border-b border-gray-200 last:border-b-0 ">
      <div className="w-full sm:w-1/3 text-gray-600 font-medium mb-1 sm:mb-0">{label}</div>
      <div className="w-full sm:w-2/3 text-gray-800">
        {isEditing ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <span>{displayValue}</span>
        )}
      </div>
    </div>
  );
};

// Component for displaying a single Academic Qualification item
const QualificationItem = ({ degree, university, year, specialization }) => (
  <div className="mb-3 last:mb-0 pb-3 border-b border-gray-200 last:border-b-0">
    <h3 className="text-lg font-semibold text-gray-900">{degree} - {university} ({year})</h3>
    <p className="text-gray-700 text-sm">{specialization}</p>
  </div>
);

// Component for displaying a single Professional Experience item
const ExperienceItem = ({ institution, position, years }) => (
  <div className="mb-3 last:mb-0 pb-3 border-b border-gray-200 last:border-b-0">
    <h3 className="text-lg font-semibold text-gray-900">{position}, {institution}</h3>
    <p className="text-gray-700 text-sm">{years}</p>
  </div>
);

/**
 * FacultyProfile Component
 *
 * This component displays a structured profile for a faculty member
 * with pre-defined mock data, integrating the profile picture and
 * additional personal/professional info while maintaining the "Basic Info"
 * and "Experience" section styles from the provided screenshot.
 * It is designed to be fully responsive using Tailwind CSS.
 * This version now includes basic edit/save/cancel functionality.
 */
const FacultyProfile = () => {
  const initialProfile = {
    first_name: 'Ichshanackiyan',
    middle_name: '',
    last_name: 'R',
    gender: 'Male',
    address: '123, Tech Street, Knowledge City, Chennai, Tamil Nadu, India - 600001',
    dateOfBirth: '1995-07-16',
    
    email: 'ichshanackiyan.faculty@university.edu',
    phone: '+91 98765 43210',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    profilePicture: 'https://placehold.co/150x150/4CAF50/FFFFFF?text=I',

    department_id: 'CSE001',
    faculty_id: 'FCLT007',

    academicQualifications: [
      { degree: 'Ph.D.', university: 'Indian Institute of Science', year: 2012, specialization: 'Computer Science' },
      { degree: 'M.Tech', university: 'IIT Madras', year: 2008, specialization: 'Artificial Intelligence' },
      { degree: 'B.E.', university: 'Anna University', year: 2006, specialization: 'Computer Science & Engineering' },
    ],
    // Text version for editing, will be parsed back on save
    academicQualificationsText: 'Ph.D. - Indian Institute of Science (2012) - Computer Science;\nM.Tech - IIT Madras (2008) - Artificial Intelligence;\nB.E. - Anna University (2006) - Computer Science & Engineering',

    professionalExperience: [
      { institution: 'University of XYZ', position: 'Associate Professor', years: '2018 - Present' },
      { institution: 'ABC College of Engineering', position: 'Assistant Professor', years: '2013 - 2018' },
      { institution: 'Tech Solutions Inc.', position: 'Research Engineer', years: '2012 - 2013' },
    ],
    // Text version for editing, will be parsed back on save
    professionalExperienceText: 'Associate Professor, University of XYZ (2018 - Present);\nAssistant Professor, ABC College of Engineering (2013 - 2018);\nResearch Engineer, Tech Solutions Inc. (2012 - 2013)',
    
    skillsCertifications: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Python', 'TensorFlow', 'AWS Certified Machine Learning Specialty'],
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState(initialProfile);
  const [newSkillInput, setNewSkillInput] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditableProfile(profile);
    setNewSkillInput('');
  };

  const handleSave = () => {
    console.log("Saving profile:", editableProfile);
    
    // Parse academicQualificationsText back into structured array
    const updatedAcademicQualifications = editableProfile.academicQualificationsText
        .split(';')
        .map(item => {
            const parts = item.trim().split(' - ');
            if (parts.length >= 2) {
                const degree = parts[0].trim();
                const universityAndYear = parts[1].trim();
                const yearMatch = universityAndYear.match(/\((\d{4})\)/);
                const year = yearMatch ? parseInt(yearMatch[1]) : null;
                const university = yearMatch ? universityAndYear.replace(yearMatch[0], '').trim() : universityAndYear;
                const specialization = parts.length > 2 ? parts.slice(2).join(' - ').trim() : '';
                return { degree, university, year, specialization };
            }
            return null;
        })
        .filter(item => item !== null);

    // Parse professionalExperienceText back into structured array
    const updatedProfessionalExperience = editableProfile.professionalExperienceText
        .split(';')
        .map(item => {
            const parts = item.trim().split(', ');
            if (parts.length >= 2) {
                const position = parts[0].trim();
                const institutionAndYears = parts[1].trim().split(' (');
                const institution = institutionAndYears[0].trim();
                const years = institutionAndYears[1] ? `(${institutionAndYears[1]}` : '';
                return { institution, position, years };
            }
            return null;
        })
        .filter(item => item !== null);

    setProfile({
        ...editableProfile,
        academicQualifications: updatedAcademicQualifications,
        professionalExperience: updatedProfessionalExperience,
    });
    setIsEditing(false);
    setNewSkillInput('');
    alert('Profile saved! (Simulated)');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkillInput.trim() !== '') {
      const skillToAdd = newSkillInput.trim();
      if (!editableProfile.skillsCertifications.includes(skillToAdd)) {
        setEditableProfile(prev => ({
          ...prev,
          skillsCertifications: [...prev.skillsCertifications, skillToAdd]
        }));
      }
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditableProfile(prev => ({
      ...prev,
      skillsCertifications: prev.skillsCertifications.filter(skill => skill !== skillToRemove)
    }));
  };

  const fullName = `${profile.first_name} ${profile.middle_name ? profile.middle_name + ' ' : ''}${profile.last_name}`.trim();

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 font-inter">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-5xl mx-auto">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 pb-6 border-b border-gray-200 mb-8">
          <div className="flex-shrink-0 relative">
            <img
              src={profile.profilePicture}
              alt={`${fullName}'s profile`}
              className="w-36 h-36 rounded-full object-cover shadow-md border-4 border-blue-500"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/cccccc/000000?text=No+Image'; }}
            />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{fullName}</h1>
            <p className="text-xl text-blue-600 font-semibold mb-1">{profile.designation}</p>
            <p className="text-lg text-gray-700">{profile.department}</p>
            {/* Removed email and phone from here as requested */}
          </div>
        </div>

        {/* Main Content Grid - Changed to single column for all sizes */}
        <div className="grid grid-cols-1 gap-8">
          {/* Personal Details Card */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
              {/* Removed material-icons span */} Personal_details
            </h2>
            {/* Reordered fields */}
            <BasicInfoRow 
              label="First Name" 
              value={editableProfile.first_name} 
              isEditing={isEditing}
              name="first_name"
              onChange={handleChange}
            />
            <BasicInfoRow 
              label="Middle Name" 
              value={editableProfile.middle_name} 
              isEditing={isEditing}
              name="middle_name"
              onChange={handleChange}
            />
            <BasicInfoRow 
              label="Last Name" 
              value={editableProfile.last_name} 
              isEditing={isEditing}
              name="last_name"
              onChange={handleChange}
            />
            <BasicInfoRow 
              label="Faculty ID" 
              value={editableProfile.faculty_id} 
              isEditing={isEditing}
              name="faculty_id"
              onChange={handleChange}
            />
            <BasicInfoRow 
              label="Department ID" 
              value={editableProfile.department_id} 
              isEditing={isEditing}
              name="department_id"
              onChange={handleChange}
            />
            <BasicInfoRow 
              label="Gender" 
              value={editableProfile.gender} 
              isEditing={isEditing}
              name="gender"
              onChange={handleChange}
            />
            <BasicInfoRow 
              label="Address"
              value={editableProfile.address} 
              isEditing={isEditing}
              name="address"
              onChange={handleChange}
            />
            <BasicInfoRow 
              label="Birthday" 
              value={editableProfile.dateOfBirth} 
              isEditing={isEditing}
              name="dateOfBirth"
              type="date" 
              onChange={handleChange}
            />
            <BasicInfoRow 
              label="Email" 
              value={editableProfile.email} 
              isEditing={isEditing}
              name="email"
              type="email"
              onChange={handleChange}
            />
            <BasicInfoRow 
              label="Phone" 
              value={editableProfile.phone} 
              isEditing={isEditing}
              name="phone"
              type="tel"
              onChange={handleChange}
            />
          </div>

          {/* Academic Qualifications Card */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
              {/* Removed material-icons span */} Qualifications
            </h2>
            {isEditing ? (
              <ProfileTextAreaField
                label="Qualifications (Degree - University (Year) - Specialization;)"
                name="academicQualificationsText"
                value={editableProfile.academicQualificationsText}
                onChange={handleChange}
                rows="6"
                placeholder="e.g., Ph.D. - Indian Institute of Science (2012) - Computer Science;"
              />
            ) : (
              profile.academicQualifications && profile.academicQualifications.length > 0 ? (
                profile.academicQualifications.map((qual, index) => (
                  <QualificationItem 
                    key={index}
                    degree={qual.degree}
                    university={qual.university}
                    year={qual.year}
                    specialization={qual.specialization}
                  />
                ))
              ) : (
                <p className="text-gray-700">No academic qualifications listed.</p>
              )
            )}
          </div>

          {/* Professional Experience Card */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
              {/* Removed material-icons span */} Work_experience
            </h2>
            {isEditing ? (
              <ProfileTextAreaField
                label="Experience (Position, Institution (Years);)"
                name="professionalExperienceText"
                value={editableProfile.professionalExperienceText}
                onChange={handleChange}
                rows="6"
                placeholder="e.g., Associate Professor, University of XYZ (2018 - Present);"
              />
            ) : (
              profile.professionalExperience && profile.professionalExperience.length > 0 ? (
                profile.professionalExperience.map((exp, index) => (
                  <ExperienceItem 
                    key={index}
                    institution={exp.institution}
                    position={exp.position}
                    years={exp.years}
                  />
                ))
              ) : (
                <p className="text-gray-700">No professional experience listed.</p>
              )
            )}
          </div>

          {/* Skills & Certifications Card - Updated UI */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
              {/* Removed material-icons span */} Skills & Certifications
            </h2>
            {isEditing ? (
              <>
                <div className="flex flex-wrap items-center gap-2 mb-4 p-2 border border-gray-300 rounded-md bg-white min-h-[40px]">
                  {editableProfile.skillsCertifications.map((skill, index) => (
                    <span key={index} className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2 py-0.5 rounded-md shadow-sm">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 -mr-0.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-200 text-blue-700 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <span className="material-icons text-xs">close</span>
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    className="flex-grow min-w-[100px] px-1 py-0.5 border-0 focus:outline-none bg-transparent"
                    placeholder="Add new skill..."
                  />
                </div>
                <p className="text-sm text-gray-500">Press Enter to add a skill.</p>
              </>
            ) : (
              profile.skillsCertifications && profile.skillsCertifications.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skillsCertifications.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">No skills or certifications listed.</p>
              )
            )}
          </div>
        </div>

        {/* Edit/Save/Cancel Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
