import { gql } from "@apollo/client";

export const GET_TOP_STAKERS = gql`
  query GetTopStakers {
    stakers(
      first: 30,
      orderBy: currentlyStaked,
      orderDirection: desc
    ) {
      id
      address
      totalStaked
      totalUnstaked
      currentlyStaked
      createdAt
      updatedAt
    }
  }
`;
