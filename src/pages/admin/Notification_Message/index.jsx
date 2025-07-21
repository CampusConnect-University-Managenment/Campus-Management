import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";

const Notification_Message = () => {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([
    {
      name: "Faculty Meeting",
      time: "10:00 AM",
      venue: "Conference Room A",
      date: "",
    },
    {
      name: "Student Orientation",
      time: "2:00 PM",
      venue: "Main Auditorium",
      date: "",
    },
    {
      name: "Library Workshop",
      time: "3:30 PM",
      venue: "Library Hall",
      date: "",
    },
    {
      name: "Emergency Drill",
      time: "4:00 PM",
      venue: "Campus Wide",
      date: "",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    name: "",
    time: "",
    venue: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const istDateTime = new Date(`${newEvent.date}T${newEvent.time}`);
    const istTimeString = istDateTime.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

    const newEntry = {
      ...newEvent,
      time: istTimeString,
    };

    setEvents([newEntry, ...events]);
    setShowForm(false);
    setNewEvent({ name: "", time: "", venue: "", date: "" });
  };

  return (
    <Card sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          📢 Notice Board - Today's Events
        </Typography>
        <Button
          variant="contained"
          color="info"
          onClick={() => setShowForm(!showForm)}
          sx={{
            borderRadius: "50%",
            minWidth: "36px",
            width: "36px",
            height: "36px",
            p: 0,
          }}
        >
          <Icon>add</Icon>
        </Button>
      </Box>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <Box mb={3}>
            <TextField
              label="Date"
              name="date"
              type="date"
              fullWidth
              value={newEvent.date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Event Name"
              name="name"
              fullWidth
              value={newEvent.name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Time"
              name="time"
              type="time"
              fullWidth
              value={newEvent.time}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Venue"
              name="venue"
              fullWidth
              value={newEvent.venue}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              required
            />
            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
          </Box>
        </form>
      )}

      {/* Event List */}
      <Box>
        {events.map((event, index) => (
          <Card
            key={index}
            sx={{
              p: 2,
              mb: 2,
              transition: "0.3s",
              "&:hover": { backgroundColor: "#1976d2", color: "#fff" },
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {event.name}
            </Typography>
            <Typography variant="body2">🕒 {event.time}</Typography>
            <Typography variant="body2">📍 {event.venue}</Typography>
          </Card>
        ))}
      </Box>
    </Card>
  );
};

export default Notification_Message;
