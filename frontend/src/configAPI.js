// eslint-disable-next-line no-undef
const env = process.env.REACT_APP_ENV;

export let url = "http://localhost:8000/api/";
export let urlWithoutApiPrefix = "http://localhost:8000";


export const apiURL = {
    url,
    urlsAvatar: urlWithoutApiPrefix
};