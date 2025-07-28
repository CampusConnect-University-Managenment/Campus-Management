"use client"

import { useState } from "react"

/**
 * Announcements Component
 * Clean, simplified interface for sending announcements to all students
 * Matches the exact design from the provided image
 */
const Announcements = () => {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState("")
  const [sendError, setSendError] = useState("")

  // Mock API call to simulate sending announcement to all students
  const sendAnnouncementToAllStudents = async (announcementData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Sending announcement to all students:", announcementData)

        if (Math.random() > 0.1) {
          resolve({
            success: true,
            message: "Announcement sent to all students successfully!",
            recipientCount: 1250,
          })
        } else {
          reject({
            success: false,
            message: "Failed to send announcement. Please try again.",
          })
        }
      }, 1500)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSendError("")
    setSendSuccess("")
    setIsSending(true)

    if (!title.trim() || !message.trim()) {
      setSendError("Title and Message cannot be empty.")
      setIsSending(false)
      return
    }

    const announcementData = {
      title: title.trim(),
      message: message.trim(),
      recipients: "all_students",
      timestamp: new Date().toISOString(),
      sender: "Faculty Member",
      type: "announcement",
    }

    try {
      const response = await sendAnnouncementToAllStudents(announcementData)
      setSendSuccess(response.message)

      // Clear form on success
      setTitle("")
      setMessage("")
    } catch (err) {
      setSendError(err.message || "An unexpected error occurred.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">Send Announcement</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Announcement Title */}
          <div>
            <label htmlFor="announcement-title" className="block text-sm font-medium text-gray-700 mb-2">
              Announcement Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="announcement-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., Important Update: Exam Schedule Change"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="announcement-message" className="block text-sm font-medium text-gray-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="announcement-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
              placeholder="Write your announcement message here..."
              required
            ></textarea>
          </div>

          {/* Send To - Simple text display without radio button */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Send To:</label>
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="font-medium">All Students</span>
            </div>
            <p className="text-sm text-gray-500 mt-1 ml-7">
              This announcement will be sent to all students and will appear in their notifications.
            </p>
          </div>

          {/* Status Messages */}
          {sendError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <span className="font-medium">Error!</span>
                  <span className="ml-1">{sendError}</span>
                </div>
              </div>
            </div>
          )}

          {sendSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <span className="font-medium">Success!</span>
                  <span className="ml-1">{sendSuccess}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSending}
              className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                isSending
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
              }`}
            >
              {isSending ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Announcement"
              )}
            </button>
          </div>
        </form>

        
      </div>
    </div>
  )
}

export default Announcements
