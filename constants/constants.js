const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASSWORD;
const DATABASE = "users";

export const MONGODB_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.4m7d6.mongodb.net/${DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;
