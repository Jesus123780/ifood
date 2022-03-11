import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
// import Sequelize, { DataTypes } from "sequelize"
// import sequelize from "../graphql/db/config"
// const sequelize = new Sequelize("sqlite::memory:")
// import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter"
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID,
            clientSecret: process.env.APPLE_SECRET
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
        })
        // ...add more providers here
    ],  
    // adapter: SequelizeAdapter(sequelize, {
    //     models: {
    //         User: sequelize.define("user", {
    //             ...models.User,
    //             phoneNumber: DataTypes.STRING,
    //         }),
    //     },
    // }),
    jwt: {
        encryption: true
    },
    secret: "secret token",
    //Callback here
})