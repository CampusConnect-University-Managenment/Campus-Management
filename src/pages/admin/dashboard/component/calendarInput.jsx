// import React from 'react';

// const CalendarInput = ({
//   selectedDate,
//   eventTitle,
//   eventType,
//   endDate,
//   onTitleChange,
//   onTypeChange,
//   onEndDateChange,
//   onSubmit,
//   onDelete,
//   onClear,
//   isUpdate
// }) => {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md border w-full max-w-5xl mx-auto mt-8">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-bold">Add/Edit Event for {selectedDate}</h3>
//         <button
//           onClick={onClear}
//           className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-150"
//         >
//           Clear Form
//         </button>
//       </div>

//       <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Start Date</label>
//           <input
//             type="text"
//             id="eventDate"
//             value={selectedDate}
//             readOnly
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//           />
//         </div>

//         <div>
//           <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date (optional)</label>
//           <input
//             type="text"
//             id="endDate"
//             value={endDate}
//             onChange={onEndDateChange}
//             placeholder="YYYY-MM-DD"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//           />
//         </div>

//         <div>
//           <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">Event Title</label>
//           <input
//             type="text"
//             id="eventTitle"
//             value={eventTitle}
//             onChange={onTitleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//           />
//         </div>

//         <div>
//           <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Event Type</label>
//           <select
//             id="eventType"
//             value={eventType}
//             onChange={onTypeChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//           >
//             <option value="">Select Type</option>
//             <option value="exam">Exam</option>
//             <option value="event">Event</option>
//             <option value="holiday">Holiday</option>
//           </select>
//         </div>

//         <div className="col-span-2 flex justify-end gap-3 mt-4">
//           <button
//             type="submit"
//             className={`px-6 py-2 ${isUpdate ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'} text-white rounded`}
//           >
//             {isUpdate ? 'Update' : 'Save'}
//           </button>
//           {isUpdate && (
//             <button
//               type="button"
//               onClick={onDelete}
//               className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CalendarInput;
import React from 'react';

const CalendarInput = ({
  selectedDate,
  eventTitle,
  eventType,
  endDate,
  onTitleChange,
  onTypeChange,
  onEndDateChange,
  onSubmit,
  onDelete,
  onClear,
  isUpdate
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border w-full max-w-5xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Add/Edit Event for {selectedDate}</h3>
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-150"
        >
          Clear Form
        </button>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="text"
            id="eventDate"
            value={selectedDate}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date (optional)</label>
          <input
            type="text"
            id="endDate"
            value={endDate}
            onChange={onEndDateChange}
            placeholder="YYYY-MM-DD"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">Event Title</label>
          <input
            type="text"
            id="eventTitle"
            value={eventTitle}
            onChange={onTitleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Event Type</label>
          <select
            id="eventType"
            value={eventType}
            onChange={onTypeChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Type</option>
            <option value="exam">Exam</option>
            <option value="event">Event</option>
            <option value="holiday">Holiday</option>
          </select>
        </div>

        <div className="col-span-2 flex justify-end gap-3 mt-4">
          <button
            type="submit"
            className={`px-6 py-2 ${
              isUpdate
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-green-600 hover:bg-green-700'
            } text-white rounded`}
          >
            {isUpdate ? 'Update' : 'Save'}
          </button>
          {isUpdate && (
            <button
              type="button"
              onClick={onDelete}
              className="px-6 py-2 bg-red-700 text-white rounded hover:bg-red-800"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CalendarInput;
