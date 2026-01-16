import gql from "graphql-tag";

export const typeDefs = gql`
  enum ItemType {
    SELL
    RENT
    FREE
  }

  enum UserRole {
    USER
    ADMIN
  }

  enum ItemStatus {
    AVAILABLE
    RESERVED
    SOLD
    REMOVED
  }

  enum RentUnit {
    HOUR
    DAY
    WEEK
  }

  enum RequestType {
    BUY
    RENT
    BORROW
    FREE
  }

  enum RequestStatus {
    OPEN
    FULFILLED
    CLOSED
  }

  type Request {
    id: ID!
    title: String!
    description: String
    type: RequestType!
    budget: Int
    requestRentPolicy: RentPolicy
    status: RequestStatus!
    category: Category!
    requester: User!
    createdAt: String!
  }

  type User {
    id: ID!
    name: String
    email: String!
    image: String
    username: String
    gradYear: Int
    role: UserRole!
    phone: String
    items: [Item!]!
    requests: [Request!]!
    createdAt: String!
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
    status: ItemStatus!
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
    userById(id: ID!): User
    requests: [Request!]!
    request(id: ID!): Request
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
    markItemStatus(id: ID!, status: ItemStatus!): Item!
    createRequest(
      title: String!
      description: String
      type: RequestType!
      categoryId: String!
      budget: Int
      requestRentPolicy: RentPolicyInput
    ): Request!
    closeRequest(id: ID!): Boolean!
  }
`;
