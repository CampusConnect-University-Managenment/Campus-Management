"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Upload,
  Trash2,
  Plus,
  X,
  FileText,
  Eye,
  Download,
  ImageIcon,
  RefreshCw,
  AlertCircle,
} from "lucide-react"

const NotificationManagement = () => {
  const [showForm, setShowForm] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [previewModal, setPreviewModal] = useState({ isOpen: false, notification: null, fileData: null })
  const [loadingPreview, setLoadingPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081"

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

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setError(null)
      setIsLoading(true)
      const response = await axios.get(`${API_BASE_URL}/api/notifications`)
      console.log("📥 Fetched notifications:", response.data)

      const mappedNotifications = response.data.map((notification) => ({
        ...notification,
        startDate: notification.date || notification.startDate,
        startTime: notification.time || notification.startTime,
        date: notification.date,
        time: notification.time,
      }))
      setNotifications(mappedNotifications)
    } catch (err) {
      console.error("Failed to fetch notifications:", err)
      setError(err.message || "Failed to fetch notifications")
      toast.error("Failed to load notifications")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewNotification((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewNotification((prev) => ({
        ...prev,
        attachments: [
          {
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file),
          },
        ],
      }))
    }
  }

  const removeAttachment = (index) => {
    setNewNotification((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("name", newNotification.name)
    formData.append("date", newNotification.startDate)
    formData.append("endDate", newNotification.endDate)
    formData.append(
      "time",
      new Date(`2000-01-01T${newNotification.startTime}`).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      }),
    )
    formData.append("endTime", newNotification.endTime)
    formData.append("venue", newNotification.venue)
    formData.append("audience", newNotification.audience)

    const file = fileInputRef.current?.files?.[0]
    if (file) {
      formData.append("file", file)
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/notifications/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      console.log("✅ Uploaded:", res.data)

      const newNotificationData = {
        ...res.data,
        name: newNotification.name,
        date: newNotification.startDate,
        endDate: newNotification.endDate,
        time: new Date(`2000-01-01T${newNotification.startTime}`).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }),
        endTime: newNotification.endTime,
        venue: newNotification.venue,
        audience: newNotification.audience,
        startDate: newNotification.startDate,
        startTime: new Date(`2000-01-01T${newNotification.startTime}`).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }),
        hasFile: !!file,
        fileName: file?.name || null,
        fileType: file?.type || null,
        fileSize: file?.size || 0,
        createdAt: new Date().toISOString(),
      }

      setNotifications((prev) => [newNotificationData, ...prev])
      resetForm()
      toast.success("Created!")
    } catch (err) {
      console.error("❌ Upload failed:", err)
      toast.error("Upload failed!")
    } finally {
      setIsSubmitting(false)
    }
  }

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
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handlePreviewFile = async (notification) => {
    if (!notification.hasFile && !notification.fileName) {
      toast("No file attached")
      return
    }

    setLoadingPreview(true)
    setPreviewModal({ isOpen: true, notification, fileData: null })

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/notifications/${notification._id || notification.id}/file-base64`,
        { timeout: 10000 },
      )

      if (response.data && response.data.success) {
        setPreviewModal((prev) => ({
          ...prev,
          fileData: {
            data: response.data.fileData,
            type: response.data.fileType,
            name: response.data.fileName,
            size: response.data.fileSize,
          },
        }))
      } else {
        toast.error("Preview failed")
        setPreviewModal({ isOpen: false, notification: null, fileData: null })
      }
    } catch (error) {
      console.error("Failed to load file preview:", error)
      toast.error("Preview failed")
      setPreviewModal({ isOpen: false, notification: null, fileData: null })
    } finally {
      setLoadingPreview(false)
    }
  }

  const handleDownloadFile = async (notification) => {
    if (!notification.hasFile && !notification.fileName) {
      toast("No file to download")
      return
    }

    try {
      toast.loading("Downloading...", { id: "download" })

      const response = await axios.get(
        `${API_BASE_URL}/api/notifications/${notification._id || notification.id}/download`,
        {
          responseType: "blob",
          timeout: 30000, // 30 second timeout for downloads
        },
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", notification.fileName || "attachment")
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      toast.success("Downloaded!", { id: "download" })
    } catch (error) {
      console.error("Failed to download file:", error)
      if (error.code === "ECONNABORTED") {
        toast.error("Download timeout", { id: "download" })
      } else if (error.response?.status === 404) {
        toast.error("File not found", { id: "download" })
      } else {
        toast.error("Download failed", { id: "download" })
      }
    }
  }

  const deleteNotification = async (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/notifications/${id}`)
        console.log("✅ Notification deleted successfully")
        setNotifications((prev) => prev.filter((notification) => (notification._id || notification.id) !== id))
        toast.success("Deleted!")
      } catch (err) {
        console.error("Failed to delete notification:", err)
        toast.error("Delete failed")
      }
    }
  }

  const formatTime = (time) => {
    if (!time) return "N/A"

    if (time.includes(":") && time.length <= 5) {
      return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    }
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

  const isImageFile = (fileName, fileType) => {
    if (fileType && fileType.startsWith("image/")) return true
    if (fileName) {
      const ext = fileName.toLowerCase().split(".").pop()
      return ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)
    }
    return false
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 mt-[50px] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 mb-2">Loading notifications...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 mt-[50px] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-2xl">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Connection Failed</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={fetchNotifications}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 mt-[50px]">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 2000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

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
                {/* ... existing form code ... */}
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
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                    />

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
              <button
                onClick={fetchNotifications}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
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
                        {(notification.hasFile || notification.fileName) && (
                          <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                            <FileText className="h-3 w-3" />
                            <span>File</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span>
                            {formatDate(notification.startDate || notification.date)}
                            {notification.endDate &&
                              (notification.startDate || notification.date) !== notification.endDate &&
                              ` - ${formatDate(notification.endDate)}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-500" />
                          <span>
                            {notification.startTime && notification.endTime
                              ? `${formatTime(notification.startTime)} - ${formatTime(notification.endTime)}`
                              : formatTime(notification.startTime || notification.time)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span>{notification.venue || "N/A"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-500" />
                          <span>For: {notification.audience || "N/A"}</span>
                        </div>
                      </div>

                      {(notification.hasFile || notification.fileName) && (
                        <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isImageFile(notification.fileName, notification.fileType) ? (
                                <ImageIcon className="h-5 w-5 text-blue-500" />
                              ) : (
                                <FileText className="h-5 w-5 text-blue-500" />
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  {notification.fileName || "Attached File"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {notification.fileType || "Unknown type"} •{" "}
                                  {formatFileSize(notification.fileSize || 0)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handlePreviewFile(notification)}
                                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-xs"
                                title="Preview file"
                              >
                                <Eye className="h-3 w-3" />
                                Preview
                              </button>
                              <button
                                onClick={() => handleDownloadFile(notification)}
                                className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors text-xs"
                                title="Download file"
                              >
                                <Download className="h-3 w-3" />
                                Download
                              </button>
                            </div>
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

      {/* Preview Modal */}
      {previewModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">File Preview</h3>
              <button
                onClick={() => setPreviewModal({ isOpen: false, notification: null, fileData: null })}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {loadingPreview ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span>Loading preview...</span>
                  </div>
                </div>
              ) : previewModal.fileData ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">{previewModal.fileData.name}</h4>
                    <p className="text-sm text-gray-600">
                      {previewModal.fileData.type} • {formatFileSize(previewModal.fileData.size)}
                    </p>
                  </div>

                  {isImageFile(previewModal.fileData.name, previewModal.fileData.type) ? (
                    <div className="text-center">
                      <img
                        src={`data:${previewModal.fileData.type};base64,${previewModal.fileData.data}`}
                        alt={previewModal.fileData.name}
                        className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg"
                      />
                    </div>
                  ) : previewModal.fileData.type === "application/pdf" ? (
                    <div className="text-center">
                      <iframe
                        src={`data:application/pdf;base64,${previewModal.fileData.data}`}
                        className="w-full h-96 border rounded-lg"
                        title={previewModal.fileData.name}
                      />
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Preview not available for this file type</p>
                      <button
                        onClick={() => handleDownloadFile(previewModal.notification)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Download File
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">Failed to load file preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationManagement
