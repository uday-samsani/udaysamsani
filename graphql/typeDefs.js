const gql = require('graphql-tag');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        token: String
        dob: String
        createdAt: String
        updatedAt: String
    }
    type Comment {
        _id: ID!
        user: User!
        body: String!
        createdAt: String!
        updatedAt: String
    }
    type Like {
        _id: ID!
        user: User!
        createdAt: String!
    }
    type Post {
        _id: ID!
        title: String!
        subtitle: String
        body: String!
        user: User
        tags: [String]
        comments: [Comment]!
        likes: [Like]!
        createdAt: String!
        updatedAt: String
    }
    input SigninInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
        dob: String!
    }
    input PostInput {
        title: String!
        subtitle: String
        body: String!
        tags: [String]
    }
    type Query {
        sayHi: String!
        getPostById(postId: String!): Post
        getPostByTitle(postTitle: String!): Post
        getPosts: [Post]
    }
    type Mutation {
        login(username: String!, password: String!): User!
        signin(signinInput: SigninInput): User!

        createPost(postInput: PostInput): Post!
        updatePost(postId: String!, postInput: PostInput): Post!
        deletePost(postId: String!): String

        createComment(postId: String!, body: String!): Post!
        updateComment(commentId: String!, body: String!): Post!
        deleteComment(commentId: String!): Post!

        likePost(postId: ID!): Post!
    }
`;

module.exports = typeDefs;
