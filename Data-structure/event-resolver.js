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
    fewEvents:  () => {
  
        let allEvents = [{    
          _id: '2sdf2sdfs2sfdsdfs2',
          success: true,
          author: 'Petr Work',
          name: 'Event Namm',
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
          confirmed: true ,
          hide: false
        }]

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
    fewEvents: [Event]
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
    _id: ID
    success: Boolean
    author: String
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
    imagesArr: [Image]
    description: String
    confirmed: Boolean 
    hide: Boolean
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
