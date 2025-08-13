"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Calendar, Clock, MapPin, Users, Upload, Trash2, Plus, X, FileText } from "lucide-react"

const NotificationManagement = () => {
  const [showForm, setShowForm] = useState(false)
  const [notifications, setNotifications] = useState([])
  const fileInputRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [newNotification, setNewNotification] = useState({
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    audience: "",
    attachments: [],
  })

  // Fetch notifications from API
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/notifications")
      .then((res) => {
        console.log("📥 Fetched notifications:", res.data)
        setNotifications(res.data)  
      })
      .catch((err) => {
        console.error("Failed to fetch notifications:", err)
      })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target 
    setNewNotification((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setNewNotification((prev) => ({
      ...prev,
      attachments: [{
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }],
    }));
  }
};


  const removeAttachment = (index) => {
    setNewNotification((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

 const handleFormSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData();
  formData.append("name", newNotification.name);
  formData.append("date", newNotification.startDate);
  formData.append("endDate", newNotification.endDate);
  formData.append("time", new Date(`2000-01-01T${newNotification.startTime}`).toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata"
  }));
  formData.append("endTime", newNotification.endTime);
  formData.append("venue", newNotification.venue);
  formData.append("audience", newNotification.audience);

  // Add file from input
  const file = fileInputRef.current?.files?.[0];
  if (file) {
    formData.append("file", file);
  }

  try {
    const res = await axios.post("http://localhost:8081/api/notifications/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Uploaded:", res.data);
    setNotifications((prev) => [res.data, ...prev]);
    resetForm();
    alert("Notification created successfully!");
  } catch (err) {
    console.error("❌ Upload failed:", err);
    alert("Upload failed: " + (err.response?.data?.message || err.message));
  } finally {
    setIsSubmitting(false);
  }
};


  const resetForm = () => {
    setShowForm(false)
    setNewNotification({
      name: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      venue: "",
      audience: "",
      attachments: [],
    })
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
  const fetchNotifications = () => {
  axios
    .get("http://localhost:8081/api/notifications")
    .then((res) => setNotifications(res.data))
    .catch((err) => console.error("Failed to fetch notifications:", err));
}


  const deleteNotification = (id) => {
  if (window.confirm("Are you sure you want to delete this notification?")) {
    axios
      .delete(`http://localhost:8081/api/notifications/${id}`)
      .then(() => {
        console.log("✅ Notification deleted successfully")   
         fetchNotifications();
      })
      .catch((err) => {
        console.error("Failed to delete notification:", err)
        // Optional: keep or remove this depending on whether you still want to remove from UI
        setNotifications((prev) => prev.filter((notification) => notification._id !== id))
      })
  }
}


  const formatTime = (time) => {
    if (!time) return "N/A"

    if (time.includes(":") && time.length <= 5) {
      // If it's in HH:MM format, convert it
      return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    }
    // If it's already formatted, return as is
    return time
  }

  const formatDate = (date) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 mt-[50px]">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">📢 Notice Board - Today's Events</h1>
              </div>
              <button
                className="bg-white text-blue-600 hover:bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => setShowForm(!showForm)}
                aria-label="Add Notification"
              >
                {showForm ? <X size={24} /> : <Plus size={24} />}
              </button>
            </div>
          </div>

          {/* Form Section */}
          {showForm && (
            <div className="p-6 bg-gray-50 border-b">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Create New Notification</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newNotification.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter event name"
                    />
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newNotification.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newNotification.endDate}
                      onChange={handleInputChange}
                      required
                      min={newNotification.startDate}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Time Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                    <input
                      type="time"
                      name="startTime"
                      value={newNotification.startTime}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
                    <input
                      type="time"
                      name="endTime"
                      value={newNotification.endTime}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Venue */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
                    <input
                      type="text"
                      name="venue"
                      value={newNotification.venue}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter venue location"
                    />
                  </div>
                </div>

                {/* Audience Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Target Audience *</label>
                  <div className="flex flex-wrap gap-4">
                    {["student", "faculty", "Both"].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="audience"
                          value={option}
                          checked={newNotification.audience === option}
                          onChange={handleInputChange}
                          required
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 font-medium capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Attachments (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt" />

                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload files or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF, DOC, Images up to 10MB each</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Choose Files
                    </button>
                  </div>

                  {/* Attachment List */}
                  {newNotification.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {newNotification.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl ${
                      isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                  >
                    {isSubmitting ? "Creating..." : "Create Notification"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notifications List */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">All Notifications ({notifications.length})</h3>
            </div>

            <div className="grid gap-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id || notification.id}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-300 rounded-xl p-6 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-gray-800">{notification.name}</h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span>
                            {notification.startDate
                              ? formatDate(notification.startDate)
                              : formatDate(notification.date)}
                            {notification.endDate &&
                              notification.startDate !== notification.endDate &&
                              ` - ${formatDate(notification.endDate)}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-500" />
                          <span>
                            {notification.startTime && notification.endTime
                              ? `${formatTime(notification.startTime)} - ${formatTime(notification.endTime)}`
                              : formatTime(notification.time)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span>{notification.venue}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-500" />
                          <span>For: {notification.audience}</span>
                        </div>
                      </div>

                      {/* Attachments */}
                      {notification.attachments && notification.attachments.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Attachments ({notification.attachments.length}):
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {notification.attachments.map((file, fileIndex) => (
                              <span
                                key={fileIndex}
                                className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                              >
                                <FileText className="h-3 w-3" />
                                {file.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Delete Button */}
                    <div className="ml-4">
                      <button
                        onClick={() => deleteNotification(notification._id || notification.id)}
                        className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
                    Created: {new Date(notification.createdAt || Date.now()).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}

              {notifications.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📢</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications yet</h3>
                  <p className="text-gray-500">Create your first notification to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationManagement