import React from "react";
import dateFormat from "dateformat";

export const displayDate = dateStart => {
  const todayDate = new Date();
  const eventDate = new Date(dateStart);
  if (todayDate < eventDate) {
    return (
      <div className="bubble green">
        <p>{dateFormat(eventDate, "mmmm dS, h:MM TT")}</p>
      </div>
    );
  } else {
    return (
      <div className="bubble grey">
        <p>{dateFormat(eventDate, "mmmm dS, h:MM TT")} - (PAST)</p>
      </div>
    );
  }
};
