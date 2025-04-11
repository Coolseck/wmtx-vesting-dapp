import { gql } from "@apollo/client";

export const GET_TOP_CLAIMERS = gql`
  query GetTopClaimers {
    claimers(
      first: 30,
      orderBy: issuedAmount,
      orderDirection: desc
    ) {
      id
      address
      issuedAmount
      createdAt
    }
  }
`;
