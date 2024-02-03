import { REST, Routes, SlashCommandBuilder, SlashCommandStringOption } from 'discord.js'
import { CONFIG } from '../Config.js';

// const intervalOptions = [
//   { name: '1 minutes', value: 1 },
//   { name: '2 minutes', value: 2 },
//   { name: '3 minutes', value: 3 },
//   { name: '5 minutes', value: 5 },
//   { name: '10 minutes', value: 10 },
//   { name: '1 hour', value: 60 },
// ]


const getCommands = () => [
  new SlashCommandBuilder()
    .setName("start")
    .setDescription("Starts the sales bot"),
  new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the sales bot"),
  new SlashCommandBuilder()
    .setName("drop-db")
    .setDescription("Drops the database. (Cafeful now)"),
  new SlashCommandBuilder()
    .setName("interval")
    .setDescription('The interval to scrape in minutes. 0 for manual')
]

export const registerCommands = async () => {
    const rest = new REST({ version: '10' }).setToken(CONFIG.TOKEN);

    try {
        console.log('Registering commands (/)');
      
        await rest.put(Routes.applicationCommands(CONFIG.CLIENT_ID, CONFIG.GUILD_ID), { body: getCommands() });
      
        console.log('Successfully registered commands (/)');
      } catch (error) {
        console.error(error);
      }
}
