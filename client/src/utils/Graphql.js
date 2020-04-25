import gql from 'graphql-tag';

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
            email
            dob
            createdAt
            token
        }
    }
`;

const SIGNIN_USER = gql`
    mutation signin(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
        $dob: String!
    ) {
        signin(
            signinInput: {
                username: $username
                password: $password
                confirmPassword: $confirmPassword
                email: $email
                dob: $dob
            }
        ) {
            username
            email
            dob
            createdAt
            token
        }
    }
`;

const FETCH_POST_ID_QUERY = gql`
    query getPostById($postId: String!) {
        getPostById(postId: $postId) {
            _id
            title
            subtitle
            body
            tags
            user {
                _id
                username
                email
            }
            createdAt
            updatedAt
        }
    }
`;

const FETCH_POST_TITLE_QUERY = gql`
    query getPostByTitle($postTitle: String!) {
        getPostByTitle(postTitle: $postTitle) {
            _id
            title
            subtitle
            body
            tags
            user {
                _id
                username
                email
            }
            createdAt
            updatedAt
        }
    }
`;

const FETCH_POSTS_QUERY = gql`
    query {
        getPosts {
            _id
            title
            subtitle
            body
            tags
            createdAt
            updatedAt
        }
    }
`;

const UPDATE_POST_MUTATION = gql`
    mutation updatePost(
        $postId: String!
        $title: String!
        $subtitle: String
        $body: String!
        $tags: [String]
    ) {
        updatePost(
            postId: $postId
            postInput: {
                title: $title
                subtitle: $subtitle
                body: $body
                tags: $tags
            }
        ) {
            _id
            title
            subtitle
            body
            tags
        }
    }
`;

const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $title: String!
        $subtitle: String
        $body: String!
        $tags: [String]
    ) {
        createPost(
            postInput: {
                title: $title
                subtitle: $subtitle
                body: $body
                tags: $tags
            }
        ) {
            _id
            title
            subtitle
            body
            tags
        }
    }
`;
export {
    LOGIN_USER,
    SIGNIN_USER,
    FETCH_POSTS_QUERY,
    FETCH_POST_ID_QUERY,
    FETCH_POST_TITLE_QUERY,
    CREATE_POST_MUTATION,
    UPDATE_POST_MUTATION,
};
