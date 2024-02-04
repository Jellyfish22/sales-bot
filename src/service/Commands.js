import { REST, Routes, SlashCommandBuilder, SlashCommandStringOption } from 'discord.js'
import { CONFIG } from '../Config.js';

const intervalOptions = [
  { name: '1 minutes', value: 1 },
  { name: '2 minutes', value: 2 },
  { name: '3 minutes', value: 3 },
  { name: '5 minutes', value: 5 },
  { name: '10 minutes', value: 10 },
  { name: '1 hours', value: 60 },
]

const getCommands = () => [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  new SlashCommandBuilder()
    .setName("start")
    .setDescription("Starts the sales bot"),
  new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the sales bot"),
  new SlashCommandBuilder()
    .setName("drop-db")
    .setDescription("Drops the database. (Cafeful now)"),
]

export const registerCommands = async () => {
    const rest = new REST({ version: '10' }).setToken(CONFIG.TOKEN);

    try {      
        await rest.put(Routes.applicationCommands(CONFIG.CLIENT_ID, CONFIG.GUILD_ID), { body: getCommands() });
      } catch (error) {
        console.error(error);
      }
}
