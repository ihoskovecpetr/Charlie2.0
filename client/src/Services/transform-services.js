import React from "react";
import dateFormat from "dateformat";

export const displayDate = dateStart => {
  const todayDate = new Date();
  const eventDate = new Date(dateStart);
  if (todayDate < eventDate) {
    return dateFormat(eventDate, "mmmm dS, h:MM TT");
  } else {
      return `${dateFormat(eventDate, "mmmm dS, h:MM TT")} - (PAST)`;
  }
};
