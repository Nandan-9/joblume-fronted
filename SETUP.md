# JobLume Frontend Setup

## GraphQL Integration

This application now uses GraphQL for authentication and user management. Here's how to set it up:

### 1. Environment Configuration

Create a `.env.local` file in the root directory with the following content:

```env
# GraphQL API Configuration
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql

# Add your actual GraphQL endpoint here
# NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://your-api-domain.com/graphql
```

### 2. GraphQL Mutations

The application uses the following GraphQL mutations:

#### Signup Mutation
```graphql
mutation Signup($input: SignupInput!) {
  signup(input: $input) {
    email
    id
  }
}
```

#### Signin Mutation
```graphql
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
```

### 3. Input Types

The application expects the following input types from your GraphQL schema:

#### SignupInput
```graphql
input SignupInput {
  email: String!
  password: String!
  confirmPassword: String!
  firstName: String!
  lastName: String!
  phone: String!
  about: String!
  education: String!
  skills: String!
  workExperience: String!
  projects: String
  extracurricular: String
  softSkills: String
  location: String!
  linkedin: String
  github: String
  portfolio: String
}
```

#### SigninInput
```graphql
input SigninInput {
  email: String!
  password: String!
}
```

### 4. Features

- ✅ **GraphQL Integration**: Apollo Client for data fetching
- ✅ **Authentication**: Signup and signin with GraphQL mutations
- ✅ **Form Validation**: Real-time validation with error handling
- ✅ **Error Handling**: GraphQL error handling and user feedback
- ✅ **Loading States**: Proper loading indicators during mutations
- ✅ **User Data Management**: User data storage and management

### 5. Development

1. Start your GraphQL server on the configured endpoint
2. Update the `NEXT_PUBLIC_GRAPHQL_ENDPOINT` in `.env.local`
3. Run the development server: `npm run dev`

### 6. Testing

The application will work with your GraphQL backend once the endpoint is configured correctly. Make sure your GraphQL server implements the required mutations and types.

### 7. Resume Data

Note: The signin mutation currently returns basic user information. Resume data will need to be:
- Fetched separately after signin
- Or included in the signin response
- Or stored and retrieved from a separate endpoint

For now, the application creates a basic resume structure with the user's name and empty fields for other resume data. 