export const findEmpty = obj => {
  const empty = [];
  console.log("find empty in ", obj);
  //   arr.forEach(item => {
  //     if (!item.value) {
  //       empty.push(item);
  //     }
  //   });

  for (const [key, value] of Object.entries(obj)) {
    console.log(key, value);
    if (!value && value != false) {
      empty.push(key);
    }
  }

  return empty;
};
