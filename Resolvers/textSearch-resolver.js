import Event from "../Models-Mongo/Event.js";
import User from "../Models-Mongo/User.js";

import { transformEvent } from "./merge.js";
import { updateUserYupSchema } from "./Utils/updateUserYupSchema.js";
import { formatYupError } from "./Utils/formatError.js";
import { server_Error } from "./Utils/errorPile";

export const typeDef = getTypeDefs();
export const resolvers = {
  Query: {
    textSearch: async (_, _args, __) => {
      try {
        const resultEvent = await Event.find(
          {
            $text: {
              $search: _args.text,
              $caseSensitive: false,
              $diacriticSensitive: false,
            },
          },
          { score: { $meta: "textScore" } }
        ).sort({
          score: { $meta: "textScore" },
        });

        const resultUser = await User.find(
          {
            $text: {
              $search: _args.text,
              $caseSensitive: false,
              $diacriticSensitive: false,
            },
          },
          { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        console.log("resultUser XX> ", resultUser);
        console.log("Event XX> ", resultEvent);

        const transformedEvents = resultEvent.map((event) => {
          return transformEvent(event);
        });

        console.log("transformedEvents XX> ", transformedEvents);

        // const resultsMerged = resultUser.concat(transformedEvents)

        return { events: transformedEvents, users: resultUser };
      } catch (err) {
        console.log("Some Err CATCH: ", err);
        //throw err;
        return { errorOut: server_Error };
      }
    },
  },
};

function getTypeDefs() {
  return `
  extend type Query {
    textSearch(text: String!): ResponseSearch
  }

  type ResponseSearch {
    events: [Event]
    users: [User]
    errorOut: [Error]
  }
`;
}
