import gql from "graphql-tag";

export const typeDefs = gql`
  enum ItemType {
    SELL
    RENT
    FREE
  }

  type User {
    id: ID!
    name: String
    email: String!
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

  type Item {
    id: ID!
    title: String!
    description: String!
    price: Int
    type: ItemType!
    category: Category!
    owner: User!
    createdAt: String!
  }

  type Query {
    me: User
    categories: [Category!]!
    items: [Item!]!
  }

  type Mutation {
    completeOnboarding(phone: String, username: String, gradYear: Int): Boolean!
    createItem(
      title: String!
      description: String!
      price: Int
      categoryId: String!
      type: ItemType!
    ): Item!
  }
`;
