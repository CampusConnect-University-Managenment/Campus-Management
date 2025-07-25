import React, { useState } from 'react';

/**
 * AnnouncementSender Component
 *
 * This component provides a UI for faculty members to send announcements to students.
 * It includes fields for title, message, and a simplified recipient selection.
 * The sending process is simulated with a mock API call.
 * It is designed to be fully responsive using Tailwind CSS.
 */
const AnnouncementSender = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipientType, setRecipientType] = useState('all'); // 'all', 'course', 'group'
  const [selectedCourse, setSelectedCourse] = useState(''); // Stores selected course ID/name
  const [selectedGroup, setSelectedGroup] = useState('');   // Stores selected group ID/name
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState('');
  const [sendError, setSendError] = useState('');

  // Mock data for courses and groups (in a real app, these would come from an API)
  const mockCourses = [
    { id: 'CS101', name: 'Data Structures & Algorithms' },
    { id: 'MA203', name: 'Linear Algebra' },
    { id: 'PH105', name: 'Physics for Engineers' },
  ];
  const mockGroups = [
    { id: 'CS101-A', name: 'CS101 - Section A' },
    { id: 'CS101-B', name: 'CS101 - Section B' },
    { id: 'MA203-G1', name: 'MA203 - Group 1' },
  ];

  // Mock API call to simulate sending an announcement
  const sendAnnouncement = async (announcementData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Simulating sending announcement:", announcementData);
        // Simulate success or failure
        if (Math.random() > 0.1) { // 90% chance of success
          resolve({ success: true, message: "Announcement sent successfully!" });
        } else { // 10% chance of failure
          reject({ success: false, message: "Failed to send announcement. Please try again." });
        }
      }, 1500); // Simulate network delay
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendError('');
    setSendSuccess('');
    setIsSending(true);

    if (!title.trim() || !message.trim()) {
      setSendError("Title and Message cannot be empty.");
      setIsSending(false);
      return;
    }

    const announcementData = {
      title: title.trim(),
      message: message.trim(),
      recipients: {
        type: recipientType,
        courseId: recipientType === 'course' ? selectedCourse : null,
        groupId: recipientType === 'group' ? selectedGroup : null,
      },
      timestamp: new Date().toISOString(),
      sender: 'Faculty Member Name (e.g., Dr. Ichshanackiyan Doe)', // In real app, get from auth context
    };

    try {
      const response = await sendAnnouncement(announcementData);
      setSendSuccess(response.message);
      // Clear form on success
      setTitle('');
      setMessage('');
      setRecipientType('all');
      setSelectedCourse('');
      setSelectedGroup('');
    } catch (err) {
      setSendError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 font-inter flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full mx-auto my-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
          Send Announcement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Announcement Title */}
          <div>
            <label htmlFor="announcement-title" className="block text-sm font-medium text-gray-700 mb-1">
              Announcement Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="announcement-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., Important Update: Exam Schedule Change"
              required
            />
          </div>

          {/* Announcement Message */}
          <div>
            <label htmlFor="announcement-message" className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="announcement-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="6"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Write your announcement message here..."
              required
            ></textarea>
          </div>

          {/* Recipient Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Send To:</label>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="recipientType"
                  value="all"
                  checked={recipientType === 'all'}
                  onChange={() => setRecipientType('all')}
                />
                <span className="ml-2 text-gray-700">All Students</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="recipientType"
                  value="course"
                  checked={recipientType === 'course'}
                  onChange={() => setRecipientType('course')}
                />
                <span className="ml-2 text-gray-700">Specific Course</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="recipientType"
                  value="group"
                  checked={recipientType === 'group'}
                  onChange={() => setRecipientType('group')}
                />
                <span className="ml-2 text-gray-700">Specific Group</span>
              </label>
            </div>

            {recipientType === 'course' && (
              <div className="mt-4">
                <label htmlFor="select-course" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Course:
                </label>
                <select
                  id="select-course"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">-- Select a Course --</option>
                  {mockCourses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>
            )}

            {recipientType === 'group' && (
              <div className="mt-4">
                <label htmlFor="select-group" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Group:
                </label>
                <select
                  id="select-group"
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">-- Select a Group --</option>
                  {mockGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Submission and Status */}
          {sendError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {sendError}</span>
            </div>
          )}
          {sendSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> {sendSuccess}</span>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className={`px-8 py-3 rounded-lg font-bold text-white shadow-md transition-colors duration-200 ${
                isSending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={isSending}
            >
              {isSending ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Announcement'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementSender;
