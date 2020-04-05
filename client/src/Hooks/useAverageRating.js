import React, { useState, useEffect } from "react";


export function useAverageRating(ratings) {
	const [averageRating, setAverageRating] = useState(0)

	useEffect(() => {
		let ratingsValue = 0
		let countRatings = 0

		if(ratings){

		  ratings.map(item => {
			countRatings++
			ratingsValue = ratingsValue + item.ratingValue
		  })

		  setAverageRating(ratingsValue/countRatings) 
		}
	  }, [ratings]);
	
return { averageRating }
}