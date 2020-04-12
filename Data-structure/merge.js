const Event = require("../Models-Mongo/Event");
const User = require("../Models-Mongo/User");

const transformEvent = async (event, areYouAuthor) => {

  if (event) {
    return {
      ...event._doc,
      _id: event.id,
      dateStart: new Date(event._doc.dateStart).toISOString(),
      author: await userLookup(event._doc.author),
      freeSnack: true,
      success: true,
      areYouAuthor: areYouAuthor,
      createdAt: event._doc.createdAt.toISOString(),
      updatedAt: event._doc.updatedAt.toISOString()
    };
  } else {
    console.log("NULL ODMITNUTO TRNS: ", event);
    return null;
  }
};

const transformUser = async (user) => {

  if (user) {
    return {
      ...event._doc,
      _id: event.id,
      createdEvents: await authorsEvents(user._doc.author),
    };
  } else {
    console.log("NULL ODMITNUTO");
    return null;
  }
};

// const transformBooking = async booking => {
//   console.log("transformBooking: ", booking._doc);
//   return {
//     ...booking._doc,
//     user: await userLookup(booking._doc.user),
//     event: await singleEvent(booking._doc.event),
//     createdAt: new Date(booking._doc.createdAt).toISOString(),
//     updatedAt: new Date(booking._doc.updatedAt).toISOString()
//   };
// };

const authorsEvents = async author_id => {
  try {
    const events = await Event.find({ author: author_id });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const eventsLookup = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    console.log("SINGLE EV ... : ", { ...event._doc, dateStart: "2019-09-18" });
    //return transformEvent(event);
    return { ...event._doc, dateStart: "2019-09-18" };
  } catch (err) {
    throw err;
  }
};

const userLookup = async userId => {
  try {
    const userLookupResult = await User.findById(userId);
    if (userLookupResult) {
      return {
        ...userLookupResult._doc,
        password: null
        // createdEvents: eventsLookup.bind(
        //   this,
        //   userLookupResult._doc.createdEvents
        // )
      };
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

exports.userLookup = userLookup;
//exports.eventsLookup = eventsLookup;
exports.singleEvent = singleEvent;
exports.transformEvent = transformEvent;
//exports.transformBooking = transformBooking;
exports.authorsEvents= authorsEvents;
