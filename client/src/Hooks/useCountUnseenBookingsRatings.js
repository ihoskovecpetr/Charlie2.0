import React, { useState, useContext, useEffect } from "react";

import { useMutation, useQuery } from "@apollo/react-hooks";

import { UserContext } from "../userContext";
import { SHOW_HOST_NEWS } from "src/Services/GQL/SHOW_HOST_NEWS";


export function useCountUnseenBookingsRatings() {
	const { context } = useContext(UserContext);
	const [values, setValues] = useState({
		countHostBookings: 0,
		countUserBookings: 0,
		countRatings: 0
	});
	const { loading, error, data } = useQuery(SHOW_HOST_NEWS, {
	  variables: { host_id: context._id }
	});

	useEffect(() => {

		if (data) {

		console.log("setValues: showhostNews: ", data)
		let {
			showRatings,
			showUserBookings,
			showHostBookings
		  } = data;

		var countHostBookings = 0
		var countUserBookings = 0
		var countRatings = 0

		  showHostBookings.map(item => {
			if(!item.seenHost) countHostBookings++
		  })
		  showUserBookings.map(item => {
			if(!item.seenUser) countUserBookings++
		  })
		
		  showRatings.map(item => {
			if(!item.seenHost) countRatings++
		  })
		}

		setValues({
			countHostBookings: countHostBookings,
			countUserBookings: countUserBookings,
			countRatings: countRatings
		})

	  }, [data]);
	
	return values //{countHostBookings: values.countHostBookings, countUserBookings: values.countUserBookings, countRatings: values.countRatings}

}