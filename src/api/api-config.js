let backendHost;
// const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if (hostname === 'https://minishop-dc5.herokuapp.com') {
    backendHost = 'https://minishop-dc5.herokuapp.com';
} else {
    backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:3000';
}

export const API_ROOT = `${backendHost}/api/`;
