// import graphqlHttp from 'express-graphql';
import { PrismaClient } from "@prisma/client";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./typesDefs";
import { GraphQLScalarType, Kind } from "graphql";
import { swarmValidationSchema } from "../validators/swarm";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    user: async (obj: any, args: { id: number }, context: any) => {
      return await prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    profile: async (obj: any, args: { id: number }) => {
      return await prisma.profile.findUnique({
        where: {
          id: args.id,
        },
        include: {
          user: true,
          settings: true,
        },
      });
    },
    swarm: async (obj: any, args: { id: number }) => {
      return await prisma.swarm.findUnique({
        where: {
          id: args.id,
        },
        include: {
          user: true,
          swarm_activities: true,
          swarm_result: true,
        },
      });
    },
    swarms: async (obj: any, args: any) => {
      return await prisma.swarm.findMany({
        include: {
          user: {
            include: {
              profile: true,
            },
          },
          swarm_activities: true,
          swarm_result: true,
        },
      });
    },
    user_swarms: async (obj: any, args: { id: number }) => {
      return await prisma.swarm.findMany({
        where: {
          user_id: args.id,
        },
        include: {
          user: {
            include: {
              profile: true,
            },
          },
          swarm_activities: true,
          swarm_result: true,
        },
      });
    },
    swarm_results: async (obj: any, args: { id: number }) => {
      return await prisma.swarmResults.findUnique({
        where: {
          id: args.id,
        },
        include: {
          swarm: true,
        },
      });
    },
    swarm_activities: async (obj: any, args: { swarm_id: number }) => {
      return await prisma.swarmActivities.findMany({
        where: {
          swarm_id: args.swarm_id,
        },
        include: {
          swarm: true,
        },
      });
    },
    user_settings: async (obj: any, args: { profile_id: number }) => {
      const user_settings = await prisma.settings.findUnique({
        where: {
          profile_id: args.profile_id,
        },
        include: {
          user: {
            include: {
              user: true,
            },
          },
        },
      });
    },
  },

  Mutation: {
    createSwarm: async (root: any, args: { input: any }, context: any) => {
      const { error } = swarmValidationSchema.validate(args.input);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const swarm = await prisma.swarm.create({
        data: args.input,
        include: {
          user: true,
        },
      });
      return swarm;
    },
    updateSwarm: async (root: any, args: any, context: any) => {
      const swarm = await prisma.swarm.update({
        where: {
          id: args.id,
        },
        data: args.input,
        include: {
          user: true,
        },
      });
      return swarm;
    },
  },
  JSON: new GraphQLScalarType({
    name: "JSON",
    description: "Custom scalar type representing JSON data",
    parseValue(value) {
      return JSON.parse(value);
    },
    serialize(value) {
      return JSON.stringify(value);
    },
    parseLiteral(ast) {
      if (ast.kind === "StringValue") {
        return JSON.parse(ast.value);
      }
      return null;
    },
  }),
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Custom scalar type representing a date and time",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      return null;
    },
  }),
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
