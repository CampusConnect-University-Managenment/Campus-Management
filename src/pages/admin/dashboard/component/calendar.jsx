
// import React from 'react';

// const Calendar = ({ year, month, events, selectedDate, onSelectDate }) => {
//   const firstDay = new Date(year, month, 1).getDay();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   const getLocalToday = () => {
//     const local = new Date();
//     local.setHours(0, 0, 0, 0);
//     return local.toISOString().split('T')[0];
//   };

//   const today = getLocalToday();

//   const getEventForDate = (dateStr) =>
//     events.find((ev) => {
//       const start = new Date(ev.startDate);
//       const end = new Date(ev.endDate);
//       const d = new Date(dateStr);
//       return d >= start && d <= end;
//     });

//   const generateDates = () => {
//     const dates = [];
//     const totalCells = firstDay + daysInMonth;
//     for (let i = 0; i < totalCells; i++) {
//       if (i < firstDay) {
//         dates.push(null);
//       } else {
//         dates.push(new Date(year, month, i - firstDay + 1));
//       }
//     }
//     return dates;
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md border w-full max-w-5xl mx-auto mt-4 mb-6">
//       <div className="grid grid-cols-7 gap-2 mb-2">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
//           <div key={d} className="text-center font-extrabold text-base">{d}</div>
//         ))}
//       </div>

//       <div className="grid grid-cols-7 gap-2">
//         {generateDates().map((date, i) => {
//           if (!date) {
//             return (
//               <div
//                 key={i}
//                 className="h-24"
//                 style={{ backgroundColor: 'transparent' }}
//               />
//             );
//           }

//           const dateStr = date.toISOString().split('T')[0];
//           const ev = getEventForDate(dateStr);
//           const isToday = dateStr === today;
//           const isSelected = selectedDate === dateStr;

//           let borderClass = '';

//           if (isSelected) {
//             borderClass = 'border-2 border-black';
//           } else {
//             borderClass = 'border border-gray-200';
//           }

//           return (
//             <div
//               key={i}
//               onClick={() => onSelectDate(dateStr)}
//               className={`h-24 p-2 text-sm rounded cursor-pointer transition-all ease-in-out duration-200
//                 ${ev ? 'bg-green-100 hover:bg-green-200' : 'hover:bg-gray-100'}
//                 ${borderClass}
//               `}
//             >
//               <div className="font-extrabold text-lg">{date.getDate()}</div>
//               {ev && <div className="text-sm font-semibold truncate">{ev.title}</div>}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Calendar;
// components/Calendar.jsx
import React from 'react';

const colorMap = {
  holiday: 'bg-red-200',
  exam: 'bg-blue-200',
  event: 'bg-green-200',
};

const Calendar = ({ year, month, events, selectedDate, onSelectDate }) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getLocalToday = () => {
    const local = new Date();
    local.setHours(0, 0, 0, 0);
    return local.toISOString().split('T')[0];
  };
  const today = getLocalToday();

  const getEventsForDate = (dateStr) =>
    events.filter((ev) => {
      const start = new Date(ev.startDate);
      const end = new Date(ev.endDate);
      const d = new Date(dateStr);
      return d >= start && d <= end;
    });

  const generateDates = () => {
    const dates = [];
    const totalCells = firstDay + daysInMonth;
    for (let i = 0; i < totalCells; i++) {
      if (i < firstDay) {
        dates.push(null);
      } else {
        dates.push(new Date(year, month, i - firstDay + 1));
      }
    }
    // pad to full weeks (optional)
    while (dates.length % 7 !== 0) dates.push(null);
    return dates;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border w-full max-w-5xl mx-auto mt-4 mb-6">
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="text-center font-extrabold text-base">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {generateDates().map((date, i) => {
          if (!date) {
            return (
              <div
                key={i}
                className="h-24 rounded border border-transparent"
                aria-hidden="true"
              />
            );
          }

          const dateStr = date.toISOString().split('T')[0];
          const dayEvents = getEventsForDate(dateStr);
          const isToday = dateStr === today;
          const isSelected = selectedDate === dateStr;

          return (
            <div
              key={i}
              onClick={() => onSelectDate(dateStr)}
              className={`h-24 p-2 text-sm rounded cursor-pointer transition-all ease-in-out duration-200 flex flex-col justify-start
                bg-white
                ${isSelected ? 'border-2 border-black' : 'border border-gray-200'}
                ${isToday ? 'ring-1 ring-blue-400' : ''}
              `}
            >
              <div className="font-extrabold text-lg">{date.getDate()}</div>
              <div className="mt-1 flex flex-col gap-1">
                {dayEvents.map((ev, idx) => {
                  const typeKey = ev.type?.toLowerCase() || '';
                  const pillColor = colorMap[typeKey] || 'bg-gray-200';
                  return (
                    <div
                      key={idx}
                      className={`text-xs px-2 py-1 rounded flex items-center font-semibold truncate ${pillColor}`}
                    >
                      {ev.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
