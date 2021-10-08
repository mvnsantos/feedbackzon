export default
    {
        backendUrl: process.env.REACT_APP_SERVICE_URL == null ? 'https://localhost:3335/' : process.env.REACT_APP_SERVICE_URL
    };