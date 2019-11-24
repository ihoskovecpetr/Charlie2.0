const Event = require("../Models-Mongo/Event");
const User = require("../Models-Mongo/User");

const transformEvent = event => {
  console.log("transformEvent FCE");
  return {
    ...event._doc,
    _id: event.id,
    date: new Date(event._doc.date).toISOString(),
    creator: userLookup.bind(this, event._doc.creator)
  };
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
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const userLookup = async userId => {
  try {
    const userLookupResult = await User.findById(userId);
    console.log("Users created events:", userLookupResult._doc.createdEvents);
    return {
      ...userLookupResult._doc,
      password: null,
      createdEvents: eventsLookup.bind(
        this,
        userLookupResult._doc.createdEvents
      )
    };
  } catch (err) {
    throw err;
  }
};

exports.userLookup = userLookup;
//exports.eventsLookup = eventsLookup;
exports.singleEvent = singleEvent;
exports.transformEvent = transformEvent;
