import React from "react"
import countdown from "countdown";

export function useCountdown(date, max) {

	let result = " "

	if(new Date(date) < new Date()){

		result =`${countdown(
			new Date(date),
			new Date(),
			"X",
			max
		  ).toString()} ago`

	}else{
		result =`In ${countdown(
			new Date(date),
			new Date(),
			"X",
			max
		  ).toString()}`
	}

	return {counteddownDate: result}

}