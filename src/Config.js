import { config } from 'dotenv'
config()

export const CONFIG = {
  CLIENT_ID: process.env.CLIENT_ID || '',     // Application Id
  GUILD_ID: process.env.GUILD_ID || '',       // Server Id
  TOKEN: process.env.TOKEN || '',             // Token seret from Discord
  MONGODB_URI: process.env.MONGODB_URI || '',
}

export const PROPERTIES = {
  CHANNEL_ID: "1181994486830739466", 
  NAME: "AKUDO",
  INTERVAL: 1,
}