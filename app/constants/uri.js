import SERVER_INFO from "./serverInfo";
const URI = {
  GOOGLE_MAP: {
    TEXT_SEARCH: ({ query }) => 
    `${SERVER_INFO.uri}/api/search/suggestion?query=${query}`
  },
};
export default URI;
