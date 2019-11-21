import Event from "../Models-Mongo/Event.js";

export const typeDef = newFunction();
export const resolvers = {
  Query: {
    events: async () => {
      try {
        let allEvents = await Event.find({});
        console.log("allEvents: ", allEvents);
        return allEvents;
      } catch (err) {
        throw err;
      }
    },
    deleteEvents: async () => {
      try {
        let result = await Event.deleteMany({});
        console.log("allEvents: ", result);
        return result.deletedCount;
      } catch (err) {
        throw err;
      }
    },
    eventGeoDay: async (_, _args, __) => {
      console.log("Args: ", _args);
      try {
        let allEvents = await Event.find({});
        //console.log("allEvents: ", allEvents);
        return allEvents;
      } catch (err) {
        throw err;
      }
    },
    fewEvents: () => {
      let allEvents = [
        {
          _id: "2sdf2sdfs2sfdsdfs2",
          success: true,
          author: "Petr Work",
          name: "Event Namm",
          lng: 14.45,
          lat: 50,
          addressGoogle: "addressGoogle",
          addressCustom: "addressCustom",
          address: "address",
          eventType: 1,
          dateStart: "2019-10-10",
          price: 12,
          capacityMax: 20,
          BYO: true,
          //imagesArr: [ImageInput],
          description: "Desc",
          confirmed: true,
          hide: false
        }
      ];

      return allEvents;
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
            address: _args.eventInput.address,
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
            confirmed: true,
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
      return {
        name: "Fighter for adventure",
        picture:
          "https://techcrunch.com/wp-content/uploads/2019/09/SpaceX-Starship-Mk1-17.jpg?w=1390&crop=1"
      };
    }
  }
};
function newFunction() {
  return `
  extend type Query {
    events(name: String ): [Event]
    deleteEvents: String
    fewEvents: [Event]
    eventGeoDay(date: String, geoObj: BoundsInput ): [Event]
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
    address: String
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

  input BoundsInput {
    ne: Float
    nw: Float
    se: Float
    sw: Float
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
    isSelected: Boolean
  }

  type Event {
    _id: ID
    success: Boolean
    author: User
    name: String
    geometry: Geometry
    addressGoogle: String
    addressCustom: String
    address: String
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
    imagesArr: [Image]
    description: String
    confirmed: Boolean 
    hide: Boolean
  }

  type Geometry{
    coordinates: [Float]
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
