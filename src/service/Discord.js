import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';

export const getClient = async () => {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
    });

    client.login(process.env.TOKEN);

    return client;
}

export const sendMessage = async (client, channelId, sale) => {
    console.log(`Sending message to ${channelId}`)

    try {
        const timestampInSeconds = Math.floor(new Date(sale.timestamp).getTime() / 1000);
        const formattedTimestamp = `<t:${timestampInSeconds}:F>`;

        const embed = new EmbedBuilder()
            .setAuthor({ name: AVALYTICS_CONFIG.NAME, iconURL: AVALYTICS_CONFIG.ICON_URL, url: AVALYTICS_CONFIG.WEBSITE_URL })
            .setTitle(sale.name)
            .setDescription(`Congrats ${sale.to} on the purchase`)
            .setColor("#B14141")
            .addFields(
                { name: "Timestamp", value: `${formattedTimestamp}` },
                { name: "Price", value: `${sale.price}`, inline: true },
                { name: "Seller", value: `${sale.from}`, inline: true },
                { name: "Marketplace", value: "Hyperspace", inline: true }
            )
            .setImage(`${sale.imgUrl}`)
            .setFooter({ text: `Data provided by ${AVALYTICS_CONFIG.NAME}`, iconURL: AVALYTICS_CONFIG.ICON_URL });

        const targetChannel = await client.channels.fetch(channelId);

        if (targetChannel) {
            await targetChannel.send({ embeds: [embed] });
            console.log("Message sent successfully to the channel.");
        } else {
            console.error("Channel not found.");
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

const AVALYTICS_CONFIG = {
    NAME: "avalytics.xyz",
    WEBSITE_URL: "https://www.avalytics.xyz/",
    ICON_URL: "https://pbs.twimg.com/profile_images/1628906391720312833/vSW4IOj1_400x400.png",
}