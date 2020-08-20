import React from "react";

//TODO: add memoized value

export function useHighlitedSearchString({ string, searchText }) {
  var regex = new RegExp(searchText, "i");

  let resultStrArr = string.split(regex);
  let newSearchText = searchText;

  if (resultStrArr.length === 1) {
    const searchTxtArr = searchText.split(" ");
    for (var i = 0; i < searchTxtArr.length; i++) {
      //   const regex = new RegExp(searchTxtArr[i], "i");
      const deepSearchStringArr = resultStrArr[0].split(
        new RegExp(searchTxtArr[i], "i")
      );
      if (deepSearchStringArr.length != 1) {
        resultStrArr = deepSearchStringArr;
        newSearchText = searchTxtArr[i];
        break;
      }
    }
  }

  const processedStringMap = resultStrArr.map((subS, index) => {
    return (
      <>
        <span>{subS}</span>
        {resultStrArr.length != index + 1 && (
          <span style={{ backgroundColor: "yellow" }}>{newSearchText}</span>
        )}
      </>
    );
  });

  return processedStringMap;
}
