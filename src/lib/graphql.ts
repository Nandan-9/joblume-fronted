import { gql } from '@apollo/client';

// GraphQL endpoint - replace with your actual endpoint
export const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8000/graphql';

// Signup mutation
export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      email
      id
    }
  }
`;

// Signin mutation
export const SIGNIN_MUTATION = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      email
      firstName
      id
      lastName
      phone
      updatedAt
      createdAt
    }
  }
`;

// Update user mutation
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($email: String!, $input: UpdateUserInput!) {
    updateUser(email: $email, input: $input) {
      id
      email
      firstName
      lastName
      phone
      about
      education {
        type
        degree
        institution
        year
        gpa
        description
      }
      extracurricular
      github
      linkedin
      location
      portfolio
      projects {
        title
        description
        startDate
        endDate
        technologies
        url
      }
      skills
      softSkills
      workExperience {
        title
        company
        location
        startDate
        endDate
        current
        description
        achievements
      }
      updatedAt
    }
  }
`;

// Apollo Client configuration
export const createApolloClient = () => {
  const { ApolloClient, InMemoryCache, createHttpLink } = require('@apollo/client');
  
  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
}; 