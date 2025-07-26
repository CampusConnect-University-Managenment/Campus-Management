import React, { useState, useEffect } from 'react';

/**
 * Helper function to get today's date in YYYY-MM-DD format for date input min attribute.
 */
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Helper function to format date strings for display.
 */
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * AnnouncementSender Component
 *
 * This component provides a UI for faculty members to send announcements to students.
 * It also displays previously sent announcements with pagination, allowing faculty to be aware of them.
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

  // State for pinning announcements
  const [isPinned, setIsPinned] = useState(false);
  const [pinStartDate, setPinStartDate] = useState('');
  const [pinEndDate, setPinEndDate] = useState('');

  // State for displaying sent announcements
  const [sentAnnouncements, setSentAnnouncements] = useState([]);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);

  // NEW STATE for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [announcementsPerPage] = useState(5); // Number of announcements per page

  // Get today's date string once
  const todayDate = getTodayDateString();

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

  // Mock data for previously sent announcements (extended for pagination demo)
  const mockSentAnnouncementsData = [
    { id: 1, title: 'Welcome to New Semester!', message: 'Dear students, welcome to the new academic year. We wish you all the best!', recipients: { type: 'all' }, timestamp: '2025-07-20T10:00:00Z', sender: 'Dr. Ichshanackiyan Doe', pinnedRange: null },
    { id: 2, title: 'Reminder: Project Submission Deadline', message: 'Just a friendly reminder that the project for Data Structures & Algorithms (CS101) is due next Friday.', recipients: { type: 'course', courseId: 'CS101' }, timestamp: '2025-07-22T14:30:00Z', sender: 'Dr. Ichshanackiyan Doe', pinnedRange: { startDate: '2025-07-22', endDate: '2025-07-29' } },
    { id: 3, title: 'Group Meeting for MA203-G1', message: 'Group 1 of Linear Algebra (MA203) will have a mandatory meeting on Monday at 3 PM in Room 105.', recipients: { type: 'group', groupId: 'MA203-G1' }, timestamp: '2025-07-24T09:15:00Z', sender: 'Dr. Ichshanackiyan Doe', pinnedRange: null },
    { id: 4, title: 'Important: Holiday Break', message: 'The university will be closed from Aug 1 to Aug 5 for the holiday break.', recipients: { type: 'all' }, timestamp: '2025-07-25T11:00:00Z', sender: 'Dr. Ichshanackiyan Doe', pinnedRange: { startDate: '2025-08-01', endDate: '2025-08-05' } },
    { id: 5, title: 'New Study Material for PH105', message: 'New study materials for Physics for Engineers have been uploaded to the portal.', recipients: { type: 'course', courseId: 'PH105' }, timestamp: '2025-07-26T09:00:00Z', sender: 'Dr. Ichshanackiyan Doe', pinnedRange: null },
    { id: 6, title: 'Lab Session Rescheduled', message: 'The CS101 lab session scheduled for Tuesday has been moved to Wednesday at the same time.', recipients: { type: 'course', courseId: 'CS101' }, timestamp: '2025-07-26T10:30:00Z', sender: 'Dr. Ichshanackiyan Doe', pinnedRange: null },
    { id: 7, title: 'Feedback Session', message: 'There will be an optional feedback session for all students on course improvements next week.', recipients: { type: 'all' }, timestamp: '2025-07-27T15:00:00Z', sender: 'Dr. Ichshanackiyan Doe', pinnedRange: { startDate: '2025-08-01', endDate: '2025-08-07' } },
    { id: 8, title: 'Exam Tips for MA203', message: 'Sharing some tips to prepare for the upcoming Linear Algebra exams.', recipients: { type: 'course', courseId: 'MA203' }, timestamp: '2025-07-28T09:45:00Z', sender: 'Dr. Ichshanackiyan Doe', pinnedRange: null },
    { id: 9, title: 'Project Extension for Group B', message: 'Due to unforeseen circumstances, Group B of CS101 has been granted a 3-day extension for their project submission.', recipients: { type: 'group', groupId: 'CS101-B' }, timestamp: '2025-07-29T11:20:00Z', sender: 'Dr. Ichshanackiyan Doe', pinnedRange: null },
    { id: 10, title: 'Guest Lecture Series', message: 'A series of guest lectures will be held next month. Details to follow.', recipients: { type: 'all' }, timestamp: '2025-07-30T13:00:00Z', sender: 'Dr. Ichshanackiyan Doe', pinnedRange: null },
    { id: 11, title: 'Career Fair Announcement', message: 'Mark your calendars! Our annual career fair is scheduled for September.', recipients: { type: 'all' }, timestamp: '2025-07-31T08:00:00Z', sender: 'Dr. Ichshanackiyan Doe', pinnedRange: { startDate: '2025-09-01', endDate: '2025-09-05' } },
    { id: 12, title: 'New Assignment for PH105', message: 'Assignment 2 for PH105 is now available on the portal.', recipients: { type: 'course', courseId: 'PH105' }, timestamp: '2025-08-01T10:00:00Z', sender: 'Dr. Ichshanackiyan Doe', pinnedRange: null },
  ];

  // Simulate fetching sent announcements on component mount
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsLoadingAnnouncements(true);
      return new Promise((resolve) => {
        setTimeout(() => {
          // Sort announcements by timestamp in descending order (most recent first)
          const sortedData = mockSentAnnouncementsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          resolve(sortedData);
        }, 1000); // Simulate network delay
      });
    };

    fetchAnnouncements().then(data => {
      setSentAnnouncements(data);
      setIsLoadingAnnouncements(false);
    });
  }, []); // Empty dependency array means this runs once on mount

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

    // Validation for pinned dates
    if (isPinned) {
      if (!pinStartDate || !pinEndDate) {
        setSendError("Please select both a start and an end date for the pinned announcement.");
        setIsSending(false);
        return;
      }
      if (new Date(pinEndDate) < new Date(pinStartDate)) {
        setSendError("The end date cannot be before the start date.");
        setIsSending(false);
        return;
      }
    }

    const announcementData = {
      id: sentAnnouncements.length > 0 ? Math.max(...sentAnnouncements.map(a => a.id)) + 1 : 1, // Generate unique ID
      title: title.trim(),
      message: message.trim(),
      recipients: {
        type: recipientType,
        courseId: recipientType === 'course' ? selectedCourse : null,
        groupId: recipientType === 'group' ? selectedGroup : null,
      },
      timestamp: new Date().toISOString(),
      sender: 'Faculty Member Name (e.g., Dr. Ichshanackiyan Doe)',
      // Include pinned date range if applicable
      pinnedRange: isPinned ? {
        startDate: pinStartDate,
        endDate: pinEndDate,
      } : null,
    };

    try {
      const response = await sendAnnouncement(announcementData);
      setSendSuccess(response.message);
      // Add the new announcement to the list of sent announcements (at the beginning)
      setSentAnnouncements(prevAnnouncements => [announcementData, ...prevAnnouncements]);
      // Reset current page to 1 to show the newly added announcement
      setCurrentPage(1);
      // Clear form on success
      setTitle('');
      setMessage('');
      setRecipientType('all');
      setSelectedCourse('');
      setSelectedGroup('');
      setIsPinned(false); // Reset pinned state
      setPinStartDate('');
      setPinEndDate('');
    } catch (err) {
      setSendError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSending(false);
    }
  };

  // Handler for start date change to update end date if necessary
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setPinStartDate(newStartDate);
    // If the new start date is after the current end date, update end date to new start date
    if (pinEndDate && new Date(newStartDate) > new Date(pinEndDate)) {
      setPinEndDate(newStartDate);
    } else if (!pinEndDate) {
      // If end date is not set, set it to the start date initially
      setPinEndDate(newStartDate);
    }
  };

  // Pagination Logic
  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = sentAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const totalPages = Math.ceil(sentAnnouncements.length / announcementsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 font-inter flex flex-col items-center">
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

          {/* Pin Announcement Date Range */}
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pin-announcement"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="pin-announcement" className="ml-2 block text-sm font-medium text-gray-700">
                Pin this announcement for a specific period
              </label>
            </div>
            {isPinned && (
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="pin-start-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="pin-start-date"
                    value={pinStartDate}
                    onChange={handleStartDateChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    min={todayDate}
                    required={isPinned}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="pin-end-date" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="pin-end-date"
                    value={pinEndDate}
                    onChange={(e) => setPinEndDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    min={pinStartDate || todayDate}
                    required={isPinned}
                  />
                </div>
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

      {/* Display Sent Announcements Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full mx-auto my-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Previously Sent Announcements
        </h2>
        {isLoadingAnnouncements ? (
          <div className="text-center text-gray-500">Loading announcements...</div>
        ) : sentAnnouncements.length === 0 ? (
          <div className="text-center text-gray-500">No announcements sent yet.</div>
        ) : (
          <>
            <div className="space-y-6">
              {currentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 shadow-sm relative">
                  {announcement.pinnedRange && (
                    <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Pinned
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                  <p className="text-gray-700 text-sm mb-3">{announcement.message}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p><strong>Sent by:</strong> {announcement.sender}</p>
                    <p><strong>Sent on:</strong> {formatDate(announcement.timestamp)}</p>
                    <p>
                      <strong>Recipients:</strong>{' '}
                      {announcement.recipients.type === 'all'
                        ? 'All Students'
                        : announcement.recipients.type === 'course'
                        ? `Course: ${mockCourses.find(c => c.id === announcement.recipients.courseId)?.name || announcement.recipients.courseId}`
                        : `Group: ${mockGroups.find(g => g.id === announcement.recipients.groupId)?.name || announcement.recipients.groupId}`}
                    </p>
                    {announcement.pinnedRange && (
                      <p>
                        <strong>Pinned Period:</strong> {formatDate(announcement.pinnedRange.startDate)} - {formatDate(announcement.pinnedRange.endDate)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav className="flex justify-center items-center space-x-2 mt-8" aria-label="Pagination">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`px-3 py-1 text-sm font-medium rounded-lg ${
                        pageNumber === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AnnouncementSender;