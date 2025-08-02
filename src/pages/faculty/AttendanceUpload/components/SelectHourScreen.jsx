import React, { useState } from "react";

const SelectHourScreen = ({ hourBlocks, onProceed, onBack }) => {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (block) => {
    const ids = block.map((b) => b.id);
    if (selected.includes(ids[0])) {
      setSelected((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelected((prev) => [...prev, ...ids]);
    }
  };

  const formatBlockText = (block) => {
    const hours = block.map((b) => b.hour).sort((a, b) => a - b);
    if (hours.length === 1) return `${hours[0]}${getOrdinal(hours[0])} Hour`;
    return `${hours[0]}${getOrdinal(hours[0])} - ${
      hours[hours.length - 1]
    }${getOrdinal(hours[hours.length - 1])} Hours`;
  };

  const getOrdinal = (n) => {
    if (n === 1) return "st";
    if (n === 2) return "nd";
    if (n === 3) return "rd";
    return "th";
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select Hour Block</h2>
      {hourBlocks.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded">
          No available hours for this course, or attendance has already been
          submitted.
        </div>
      ) : (
        <div className="space-y-4">
          {hourBlocks.map((block, index) => {
            const ids = block.map((b) => b.id);
            const isSelected = selected.some((id) => ids.includes(id));

            return (
              <div
                key={index}
                className={`p-4 border rounded cursor-pointer ${
                  isSelected
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => toggleSelect(block)}
              >
                {formatBlockText(block)}
              </div>
            );
          })}
        </div>
      )}
      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="bg-gray-300 px-4 py-2 rounded">
          ← Back
        </button>
        <button
          onClick={() => onProceed(selected)}
          disabled={selected.length === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Proceed →
        </button>
      </div>
    </div>
  );
};

export default SelectHourScreen;
