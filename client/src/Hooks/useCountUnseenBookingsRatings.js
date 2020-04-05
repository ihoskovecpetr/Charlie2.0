import React, { useState, useContext, useEffect } from "react";

import { useMutation, useQuery } from "@apollo/react-hooks";

import { UserContext } from "../userContext";
import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";


export function useCountUnseenBookingsRatings() {
	const { context, setContext } = useContext(UserContext);
	const { loading, error, data } = useQuery(PROFILE_DATA, {
	  variables: { host_id: context._id }
	});

	useEffect(() => {

		if (data) {
		  let {
			showRatings,
			showUserBookings,
			showHostBookings
		  } = data;

		let count = 0

		  showHostBookings.map(item => {
			if(!item.seenHost) count++
		  })
		  showUserBookings.map(item => {
			if(!item.seenUser) count++
		  })

		let countRatings = 0
		
		  showRatings.map(item => {
			if(!item.seenHost) countRatings++
		  })

		  setContext(prev => {
			return { ...prev, 
				countUnseenBookings: count, 
				countUnseenRatings: countRatings
			};
		  })
		}
	  }, [data]);
	
return null
}