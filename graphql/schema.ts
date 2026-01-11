import gql from "graphql-tag";

export const typeDefs = gql`
  enum ItemType {
    SELL
    RENT
    FREE
  }

  enum RentUnit {
    HOUR
    DAY
    WEEK
  }

  type User {
    id: ID!
    name: String
    email: String!
    image: String
    username: String
    gradYear: Int
    role: String!
    phone: String
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
  }

  type RentPolicy {
    unit: RentUnit!
    price: Int
    minDuration: Int!
    maxDuration: Int
  }

  type Item {
    id: ID!
    title: String!
    description: String!
    price: Int
    type: ItemType!
    rentPolicy: RentPolicy
    images: [String!]!
    status: String
    category: Category!
    owner: User!
    createdAt: String!
  }

  input RentPolicyInput {
    unit: RentUnit!
    price: Int
    minDuration: Int!
    maxDuration: Int
  }

  type Query {
    me: User
    categories: [Category!]!
    items: [Item!]!
    item(id: ID!): Item
  }

  type Mutation {
    completeOnboarding(phone: String, username: String, gradYear: Int): Boolean!
    createItem(
      title: String!
      description: String!
      price: Int
      categoryId: String!
      type: ItemType!
      images: [String!]!
      rentPolicy: RentPolicyInput
    ): Item!
    updateItem(
      id: ID!
      title: String!
      description: String!
      price: Int
      type: ItemType!
      categoryId: String!
      rentPolicy: RentPolicyInput
    ): Item!
    deleteItem(id: ID!): Item!
  }
`;
