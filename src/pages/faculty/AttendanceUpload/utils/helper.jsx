// Date formatting
export const toYYYYMMDD = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

// Unique values from array of objects
export const getUniqueValues = (arr, key) => {
  return [...new Set(arr.map((item) => item[key]))];
};

// Unique objects based on key
export const getUniqueObjects = (arr, key) => {
  const seen = new Set();
  return arr.filter((item) => {
    if (seen.has(item[key])) return false;
    seen.add(item[key]);
    return true;
  });
};
