export const findEmpty = obj => {
  const empty = [];

  for (const [key, value] of Object.entries(obj)) {
    console.log(key, value);
    if (!value && value != false) {
      empty.push(key);
    }
  }

  return empty;
};

export const sortByDate = (array, sortKey, dirrection) => {
  
  console.log("ARR TO BE Soored: ", array, sortKey, dirrection)

  const Sorted = array.sort(function(a, b) {
  let aDate = new Date(a[sortKey]);
  let bDate = new Date(b[sortKey]);
  console.log(aDate, bDate)
  if (aDate > bDate) {
    return -1;
  }
  if (aDate < bDate) {
    return 1;
  }
})

console.log("after Soored: ", Sorted)


  return Sorted;
};
