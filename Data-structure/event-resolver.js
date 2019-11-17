import Event from "../Models-Mongo/Event.js";

export const typeDef = newFunction();
export const resolvers = {
  Query: {
    events: () => {
      console.log("Query EVENTS");
      return { name: "Party ONE" };
    }
  },
  Mutation: {
    createEvent: async (_, _args, __) => {
      console.log("createEvent MUTATION hitttt: ", _args);
      try {
        let existing = await Event.find({ name: _args.eventInput.name });
        if (existing.length) {
          console.log("Duplicate of EVENT NAME");
          return { success: false };
        } else {
          let newEvent = new Event({
            name: _args.eventInput.name,
            geometry: {
              coordinates: [_args.eventInput.lat, _args.eventInput.lng]
            },
            addressGoogle: _args.eventInput.addressGoogle,
            addressCustom: _args.eventInput.addressCustom,
            eventType: _args.eventInput.eventType,
            dateStart: _args.eventInput.dateStart,
            dateEnd: _args.eventInput.dateEnd,
            price: _args.eventInput.price,
            capacityMax: _args.eventInput.capacityMax,
            BYO: _args.eventInput.BYO,
            repeatWeek: _args.eventInput.repeatWeek,
            freeSnack: _args.eventInput.freeSnack,
            freeBeer: _args.eventInput.freeBeer,
            freeMeal: _args.eventInput.freeMeal,
            imagesArr: _args.eventInput.imagesArr,
            description: _args.eventInput.description,
            confirmed: _args.eventInput.confirmed,
            hide: _args.eventInput.hide
          });
          const result = await newEvent.save();
          console.log("Saved: ", result);
          return { ...result._doc, success: true };
        }
      } catch (err) {
        throw err;
      }
    }
  },
  Event: {
    author: () => {
      console.log("Aurrr ěě");
      return { firstName: "pepa jelinek" };
    }
  }
};
function newFunction() {
  return `
  extend type Query {
    events(name: String ): [Event]
  }

  extend type Mutation {
    createEvent(eventInput: EventInput!): Event
  }

  input EventInput {
    name: String
    lng: Float
    lat: Float
    addressGoogle: String
    addressCustom: String
    eventType: Int
    dateStart: String
    dateEnd: String
    price: Float
    capacityMax: Int
    BYO: Boolean
    repeatWeek: Boolean
    freeSnack: Boolean
    freeBeer: Boolean
    freeMeal: Boolean
    imagesArr: [ImageInput]
    description: String
    confirmed: Boolean 
    hide: Boolean
  }

  input ImageInput {
    caption: String
    src: String
    thumbnail: String
    thumbnailHeight: Int
    thumbnailWidth:Int
    scaletwidth: Int
    marginLeft: Int
    vwidth: Int
  }

  type Event {
    success: Boolean
    _id: ID
    name: String
    author: String
  }
  type Image {
    caption: String
    src: String
    thumbnail: String
    thumbnailHeight: Int
    thumbnailWidth:Int
    scaletwidth: Int
    marginLeft: Int
    vwidth: Int
  }
`;
}
