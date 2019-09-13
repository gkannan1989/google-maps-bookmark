const googleMapApiKey = process.env.GOOGLE_MAP_API_KEY;

const MAP_INFO = { 
  key: googleMapApiKey,
  zoom: 14,
  defaultLocation: {
    lat: 52.5200,
    lng: 13.4050,
  },
};

export default MAP_INFO;
