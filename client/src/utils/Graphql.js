import gql from 'graphql-tag';

const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            firstname
            lastname
            email
            dob
            createdAt
            token
        }
    }
`;

const SIGNIN_USER = gql`
    mutation signin(
        $firstname: String!
        $lastname: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
        $dob: String!
    ) {
        signin(
            signinInput: {
                firstname: $firstname
                lastname: $lastname
                email: $email
                password: $password
                confirmPassword: $confirmPassword
                dob: $dob
            }
        ) {
            firstname
            lastname
            email
            dob
            createdAt
            token
        }
    }
`;

const RESET_PASSWORD_MUTATION = gql`
    mutation resetPassword(
        $token: String!
        $password: String!
        $retypePassword: String!
    ) {
        resetPassword(
            token: $token
            password: $password
            retypePassword: $retypePassword
        )
    }
`;

const SEND_PASSWORD_RESET_LINK_MUATATION = gql`
    mutation sendPasswordResetLink($email: String!) {
        sendPasswordResetLink(email: $email)
    }
`;

const VERIFY_USER = gql`
    mutation verify($token: String!) {
        verify(token: $token)
    }
`;

const FETCH_POST_ID_QUERY = gql`
    query getPostById($postId: String!) {
        getPostById(postId: $postId) {
            _id
            title
            coverImage
            body
            tags
            user {
                _id
                firstname
                lastname
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
            coverImage
            body
            tags
            user {
                _id
                firstname
                lastname
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
            coverImage
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
        $coverImage: String
        $body: String!
        $tags: [String]
    ) {
        createPost(
            postInput: {
                title: $title
                coverImage: $coverImage
                body: $body
                tags: $tags
            }
        ) {
            _id
            title
            coverImage
            body
            tags
        }
    }
`;

const UPDATE_POST_MUTATION = gql`
    mutation updatePost(
        $postId: String!
        $title: String!
        $coverImage: String
        $body: String!
        $tags: [String]
    ) {
        updatePost(
            postId: $postId
            postInput: {
                title: $title
                coverImage: $coverImage
                body: $body
                tags: $tags
            }
        ) {
            _id
            title
            coverImage
            body
            tags
        }
    }
`;

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: String!) {
        deletePost(postId: $postId)
    }
`;

const UPLOAD_IMAGE_MUTATION = gql`
    mutation uploadImage($path: String!, $file: Upload!) {
        uploadImage(path: $path, file: $file) {
            path
            filename
        }
    }
`;

const DELETE_IMAGE_MUTATION = gql`
    mutation deleteImage($path: String!, $filename: String!) {
        deleteImage(path: $path, filename: $filename)
    }
`;

export {
    LOGIN_USER,
    SIGNIN_USER,
    SEND_PASSWORD_RESET_LINK_MUATATION,
    RESET_PASSWORD_MUTATION,
    VERIFY_USER,
    FETCH_POSTS_QUERY,
    FETCH_POST_ID_QUERY,
    FETCH_POST_TITLE_QUERY,
    CREATE_POST_MUTATION,
    UPDATE_POST_MUTATION,
    DELETE_POST_MUTATION,
    UPLOAD_IMAGE_MUTATION,
    DELETE_IMAGE_MUTATION,
};
