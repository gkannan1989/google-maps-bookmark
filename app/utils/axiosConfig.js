const axiosConfig = ({
  url,
  method,
  withCredentials = false,
  data = {},
  headers = {},
}) => ({
  url,
  method,
  data,
  withCredentials,
  headers,
});

export default axiosConfig;
