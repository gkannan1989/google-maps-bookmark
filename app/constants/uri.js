import SERVER_INFO from "./serverInfo";
const URI = {
  GOOGLE_MAP: {
    TEXT_SEARCH: ({ query }) => 
    `${SERVER_INFO.uri}${process.env.SUGGESTION_PATH}?query=${query}`
  },
  BOOKMARK_END_POINT: `${SERVER_INFO.uri}${process.env.BOOKMARK_PATH}`
};
export default URI;
