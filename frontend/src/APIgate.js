///Production///
// const baseURL = "http://161.246.127.114" 

///Development///
const baseURL = "http://localhost:3000/api/v1";

const LOGIN_API = "/users/login";
const REGISTER_API = "/users/register";
const UPDATEUSERS_API = "/users/:userID";

export {
    baseURL,
    LOGIN_API,
    REGISTER_API
}