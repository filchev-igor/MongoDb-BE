export const getMongoDbUrl = ({ username, password, database }) =>
  `mongodb+srv://${username}:${password}@cluster0.4m7d6.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`;

module.exports.getMongoDbUrl = getMongoDbUrl;
