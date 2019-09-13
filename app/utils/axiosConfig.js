const axiosConfig = ({
  url,
  method,
  withCredentials = 'true',
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
