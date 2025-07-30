import React, { useState } from "react";

const SelectHourScreen = ({ onProceed, onBack, hourBlocks }) => {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const handleCheckboxChange = (block) => {
    setSelectedBlock((prevBlock) => (prevBlock === block ? null : block));
  };

  const formatBlockText = (block) => {
    const hours = block.map((h) => h.hour);
    const ordinals = { 1: "st", 2: "nd", 3: "rd" };
    const formatHour = (h) => `${h}${ordinals[h] || "th"}`;

    if (hours.length === 1) {
      return `${formatHour(hours[0])} Hour (${block[0].time})`;
    }

    const hourText = hours.map(formatHour).join(" & ");
    return `${hourText} Hours (${block[0].time.split(" - ")[0]} - ${
      block[block.length - 1].time.split(" - ")[1]
    })`;
  };

  const courseInfo = hourBlocks[0]?.[0];
  const selectedHourIds = selectedBlock ? selectedBlock.map((h) => h.id) : [];

  return (
    <div className="p-8">
      <div className="pb-4 mb-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Select Hour Block</h2>
        {courseInfo && (
          <p className="text-gray-500">
            Choose the class hours for {courseInfo.courseCode} -{" "}
            {courseInfo.courseName}.
          </p>
        )}
      </div>
      <div className="space-y-4">
        {hourBlocks.length > 0 ? (
          hourBlocks.map((block, index) => (
            <label
              key={index}
              className="flex items-center p-5 border border-gray-300 rounded-lg cursor-pointer has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
            >
              <input
                type="checkbox"
                checked={selectedBlock === block}
                onChange={() => handleCheckboxChange(block)}
                className="w-5 h-5 mr-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {formatBlockText(block)}
              </h3>
            </label>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500 bg-gray-100 rounded-md">
            No available hours for this course, or attendance has already been
            submitted.
          </p>
        )}
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          ← Back
        </button>
        <button
          onClick={() => onProceed(selectedHourIds)}
          disabled={selectedHourIds.length === 0}
          className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300"
        >
          Proceed →
        </button>
      </div>
    </div>
  );
};

export default SelectHourScreen;
