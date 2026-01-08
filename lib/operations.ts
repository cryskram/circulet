import { gql } from "@apollo/client";

export const ONBOARDING_UPDATE = gql`
  mutation Onboarding($phone: String, $username: String, $gradYear: Int) {
    completeOnboarding(phone: $phone, username: $username, gradYear: $gradYear)
  }
`;
