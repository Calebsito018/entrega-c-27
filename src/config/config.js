import dotenv from "dotenv"
dotenv.config()

export default {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URL,
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    github_callback_url: process.env.GITHUB_CALLBACK_URL,
}