import { gql } from "@apollo/client";

export const ONBOARDING_UPDATE = gql`
  mutation Onboarding($phone: String, $username: String, $gradYear: Int) {
    completeOnboarding(phone: $phone, username: $username, gradYear: $gradYear)
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      username
      image
      gradYear
      createdAt
      items {
        id
        title
        price
        type
        images
        category {
          name
        }
      }
    }
  }
`;

export const USER_BY_ID_QUERY = gql`
  query UserById($id: ID!) {
    userById(id: $id) {
      id
      name
      username
      image
      gradYear
      phone
      createdAt
      items {
        id
        title
        price
        type
        images
        category {
          name
        }
      }
    }
  }
`;

export const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      title
      price
      type
      images
      createdAt
      category {
        name
        slug
      }
      owner {
        name
      }
    }
  }
`;

export const GET_ITEMS_AND_CATEGORIES = gql`
  query ItemsAndCategories {
    items {
      id
      title
      price
      type
      images
      category {
        name
        slug
      }
    }
    categories {
      id
      name
      slug
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation CreateItem(
    $title: String!
    $description: String!
    $price: Int
    $type: ItemType!
    $categoryId: String!
    $images: [String!]!
    $rentPolicy: RentPolicyInput
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      type: $type
      categoryId: $categoryId
      images: $images
      rentPolicy: $rentPolicy
    ) {
      id
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem(
    $id: ID!
    $title: String!
    $description: String!
    $price: Int
    $type: ItemType!
    $categoryId: String!
    $rentPolicy: RentPolicyInput
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
      type: $type
      categoryId: $categoryId
      rentPolicy: $rentPolicy
    ) {
      id
    }
  }
`;

export const GET_ITEM = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      title
      description
      price
      type
      status
      images
      createdAt
      category {
        id
        name
        slug
      }
      rentPolicy {
        unit
        price
        minDuration
        maxDuration
      }
      owner {
        id
        name
        image
        phone
      }
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
      title
    }
  }
`;

export const GET_REQUESTS = gql`
  query Requests {
    requests {
      id
      title
      description
      type
      budget
      duration
      createdAt
      category {
        name
      }
      requester {
        id
        name
        image
      }
    }
  }
`;

export const GET_REQUEST = gql`
  query Request($id: ID!) {
    request(id: $id) {
      id
      title
      description
      type
      budget
      duration
      createdAt
      category {
        name
      }
      requester {
        id
        name
        phone
        image
      }
    }
  }
`;

export const CREATE_REQUEST = gql`
  mutation CreateRequest(
    $title: String!
    $description: String
    $type: RequestType!
    $categoryId: String!
    $budget: Int
    $duration: Int
  ) {
    createRequest(
      title: $title
      description: $description
      type: $type
      categoryId: $categoryId
      budget: $budget
      duration: $duration
    ) {
      id
    }
  }
`;
