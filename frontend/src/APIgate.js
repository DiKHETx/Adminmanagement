///Production///
// const baseURL = "http://161.246.127.114" 

///Development///
const baseURL = "http://localhost:3000/api/v1";

const LOGIN_API = "/users/login";
const REGISTER_API = "/users/register";
const UPDATEUSERS_API = "/users"; // `${userId}`
const DELETEUSERS_API = "/users"; // `${userId}`
const GETALLUSERS_API = "/users";

export {
    baseURL,
    LOGIN_API,
    REGISTER_API,
    GETALLUSERS_API,
    UPDATEUSERS_API,
    DELETEUSERS_API
}