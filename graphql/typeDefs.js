const gql = require('graphql-tag');

const typeDefs = gql`
	type Post {
		id: ID!
		title: String!
		subtitle: String
		body: String!
		tags: [String]
		username: String!
		createdAt: String!
		updatedAt: String
	}
	type User {
		id: ID!
		username: String!
		email: String!
		token: String!
		createdAt: String!
	}
	input RegisterInput {
		username: String!
		email: String!
		password: String!
		confirmPassword: String!
	}
	input PostInput {
		title: String!
		subtitle: String
		body: String!
		tags: [String]
	}
	type Query {
		sayHi: String!
		getPost(postId: ID!): Post!
		getPosts: [Post]!
	}
	type Mutation {
		login(username: String!, password: String!): User!
		register(registerInput: RegisterInput): User!
		createPost(postInput: PostInput): Post!
		updatePost(postId: ID!, postInput: PostInput): Post!
		deletePost(postId: ID!): String!
	}
`;

module.exports = typeDefs;
