// eslint-disable-next-line no-undef
const env = process.env.REACT_APP_ENV;

export let url = "http://localhost:8000/api/";
export let urlWithoutApiPrefix = "http://localhost:8000";
export let telegramBotUsername = "@AttractorSchoolLocalBot";

if (env === "demo") {
    url = "https://hrm.attractor-school.demo.ltestl.com/api";
    urlWithoutApiPrefix = "https://hrm.attractor-school.demo.ltestl.com/";
    telegramBotUsername = "@AttractorSchoolTimeTrackerDBot";
}

if (env === "production") {
    url = "https://hrm.it-attractor.com/api";
    urlWithoutApiPrefix = "https://hrm.it-attractor.com/";
    telegramBotUsername = "@AttractorSchoolTimeTrackerBot";
}

if (env === "staging") {
    url = "https://hrm.attractor-school.staging.ltestl.com/api";
    urlWithoutApiPrefix = "https://hrm.attractor-school.staging.ltestl.com/";
    telegramBotUsername = "@AttractorSchoolTimeTrackerSBot";
}

if (env === "tests") {
    url = "http://172.29.0.22:8000/api/";
    urlWithoutApiPrefix = "http://172.29.0.22:8000";
}


export const apiURL = {
    url,
    urlsAvatar: urlWithoutApiPrefix
};