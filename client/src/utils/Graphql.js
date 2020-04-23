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

const FETCH_BLOG_ID_QUERY = gql`
    query getPostById($blogId: String!) {
        getPostById(postId: $blogId) {
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

const FETCH_BLOG_TITLE_QUERY = gql`
    query getPostByTitle($blogTitle: String!) {
        getPostByTitle(postTitle: $blogTitle) {
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

const FETCH_BLOGS_QUERY = gql`
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
    FETCH_BLOGS_QUERY,
    FETCH_BLOG_ID_QUERY,
    FETCH_BLOG_TITLE_QUERY,
    CREATE_POST_MUTATION,
};
