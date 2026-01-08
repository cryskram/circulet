import { gql } from "@apollo/client";

export const ONBOARDING_UPDATE = gql`
  mutation Onboarding($phone: String, $username: String, $gradYear: Int) {
    completeOnboarding(phone: $phone, username: $username, gradYear: $gradYear)
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
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      type: $type
      categoryId: $categoryId
      images: $images
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
        name
        slug
      }
      owner {
        id
        name
        image
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
