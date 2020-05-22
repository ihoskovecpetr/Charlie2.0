import React, { useState, useEffect } from "react";


export function useHighlitedSearchString({string, searchText}) {
	const [averageRating, setAverageRating] = useState(0)

	var regex = new RegExp(searchText, "i");

	console.log("REGEX TEXTS: ", regex)


	let resultStrArr = string.split(regex)
	let newSearchText = searchText

	console.log("resultStrArr: ", resultStrArr)

	if(resultStrArr.length === 1){
		console.log("FIRST SPILT NIC")
		const searchTxtArr = searchText.split(" ")
		for (var i = 0; i < searchTxtArr.length; i++) {
			console.log("DEEP SPLIT")
			const regex = new RegExp(searchTxtArr[i], "i");
			const deepSearchStringArr = resultStrArr[0].split(regex)
			if (deepSearchStringArr.length != 1) {
				resultStrArr = deepSearchStringArr;
				newSearchText = searchTxtArr[i]
				console.log("DEEP cutter: ", newSearchText)
			  break;
			}
		  }
	}

	const processedStringMap = resultStrArr.map((subS, index) => {return(
	<><span>{subS}</span>
		{resultStrArr.length != index + 1 
		&& <span style={{backgroundColor: "yellow"}} >{newSearchText}</span>}</>
	)})

return processedStringMap
}