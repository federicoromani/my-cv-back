import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLYogaError } from '@graphql-yoga/node'
import { type } from 'os'

const typeDefinitions = /* GraphQL */ `
  type Query {
    getUser(id: ID!): User
  }

  type User {
    id: ID!
    email: String!
    name: String
  }
`

type User = {
  id: number,
  email: string,
  name: string
}

const users: User[] = [
  {
    id: 1,
    email: 'federico.frcu@gmail.com',
    name: 'Federico Romani'
  }
] 
  

const resolvers = {
  Query: {
    getUser: (_: any, args: any) => {
      const user =  users.find(u => u.id === parseInt(args.id));
      if (!user) {
        throw new GraphQLYogaError(`User with id '${args.id}' not found.`)
      }
      return user;
    },
  },
}

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
})