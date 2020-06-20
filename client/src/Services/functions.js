export const findEmpty = (obj) => {
  const empty = [];

  for (const [key, value] of Object.entries(obj)) {
    if (!value && value != false) {
      empty.push(key);
    }

    if (value && Array.isArray(value) && value.length === 0) {
      empty.push("Images Array");
    }
  }

  return empty;
};

export const sortByDate = (array, sortKey, dirrection) => {
  const Sorted = array.sort(function(a, b) {
    let aDate = new Date(a[sortKey]);
    let bDate = new Date(b[sortKey]);
    if (aDate > bDate) {
      return -1;
    }
    if (aDate < bDate) {
      return 1;
    }
  });

  return Sorted;
};
