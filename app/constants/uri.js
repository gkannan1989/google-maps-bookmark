import SERVER_INFO from "./serverInfo";
const URI = {
  GOOGLE_MAP: {
    TEXT_SEARCH: ({ query }) => 
    `${SERVER_INFO.uri}/api/search/suggestion?query=${query}`
  },
  BOOKMARK_END_POINT: `${SERVER_INFO.uri}/api/v1/bookmarks`
};
export default URI;
