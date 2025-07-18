// src/pages/faculty/ClassList/ClassList.jsx

import React from 'react';
import './ClassList.css'; // Make sure this path is correct relative to this file

function ClassList() {
  // --- STATIC TIMETABLE DATA FOR SHOWCASE ---
  // This data is hardcoded and does not come from a backend.
  // 'null' signifies an empty/free slot.
  const staticTimetableData = {
    "Monday": {
      1: { id: "m1h1", subject: "Discrete Math", batch: "B.Tech CSE A", room: "LH101" },
      2: { id: "m1h2", subject: "Data Structures", batch: "B.Tech CSE B", room: "LH102" },
      3: null, // Free slot
      4: { id: "m1h4", subject: "Comp. Networks", batch: "B.Tech IT A", room: "LH201" },
      5: null,
      6: { id: "m1h6", subject: "Operating Systems", batch: "B.Tech CSE A", room: "LH101" },
      7: null
    },
    "Tuesday": {
      1: { id: "t1h1", subject: "Algorithms", batch: "B.Tech IT A", room: "LH203" },
      2: null,
      3: { id: "t1h3", subject: "Software Engg.", batch: "B.Tech IT B", room: "LH204" },
      4: { id: "t1h4", subject: "Web Dev", batch: "B.Tech CSE B", room: "LH102" },
      5: null,
      6: null,
      7: { id: "t1h7", subject: "Compiler Design", batch: "B.Tech CSE A", room: "LH101" }
    },
    "Wednesday": {
      1: null,
      2: { id: "w1h2", subject: "DBMS", batch: "B.Tech CSE B", room: "LH102" },
      3: { id: "w1h3", subject: "AI Fundamentals", batch: "B.Tech CSE A", room: "LH101" },
      4: null,
      5: { id: "w1h5", subject: "Data Science", batch: "B.Tech IT A", room: "LH203" },
      6: null,
      7: null
    },
    "Thursday": {
      1: { id: "th1h1", subject: "Cyber Security", batch: "B.Tech IT B", room: "LH204" },
      2: null,
      3: null,
      4: { id: "th1h4", subject: "Cloud Computing", batch: "B.Tech CSE B", room: "LH102" },
      5: { id: "th1h5", subject: "Mobile App Dev", batch: "B.Tech IT A", room: "LH203" },
      6: null,
      7: null
    },
    "Friday": {
      1: null,
      2: { id: "f1h2", subject: "Operating Systems", batch: "B.Tech CSE A", room: "LH101" },
      3: { id: "f1h3", subject: "Algorithms", batch: "B.Tech IT A", room: "LH203" },
      4: null,
      5: null,
      6: { id: "f1h6", subject: "Web Dev", batch: "B.Tech CSE B", room: "LH102" },
      7: null
    },
    "Saturday": {
        1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null // Usually no classes on Saturday
    },
    "Sunday": {
        1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null // Usually no classes on Sunday
    }
  };

  // Define the days of the week and hours for the table structure
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hours = Array.from({ length: 7 }, (_, i) => i + 1); // Hours 1 to 7

  return (
    <div className="ClassList-container">
      <h2>Faculty Weekly Timetable - Showcase Version</h2>

      <div className="timetable-grid">
        {/* Header Row: Empty top-left corner and Hours */}
        <div className="grid-cell header-cell corner-cell"></div>
        {hours.map(hour => (
          <div key={`hour-${hour}`} className="grid-cell header-cell hour-header">
            Hour {hour}
          </div>
        ))}

        {/* Rows for each Day */}
        {days.map(day => (
          <React.Fragment key={day}>
            <div className="grid-cell header-cell day-header">{day}</div> {/* Day Header */}
            {hours.map(hour => {
              const classData = staticTimetableData[day]?.[hour]; // Get data for the specific day and hour
              return (
                <div key={`${day}-${hour}`} className="grid-cell class-slot">
                  {classData ? (
                    <div className="class-details">
                      <div className="subject">{classData.subject}</div>
                      <div className="batch">{classData.batch}</div>
                      <div className="room">{classData.room}</div>
                    </div>
                  ) : (
                    <div className="empty-slot">Free</div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ClassList;