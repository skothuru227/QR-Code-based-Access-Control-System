import fetchMock from 'fetch-mock';

// global config for fetch-mock
fetchMock.config.overwriteRoutes = false; //add a new route with the same name (or inferred name) to list of routes

exports.fetchMock = fetchMock;