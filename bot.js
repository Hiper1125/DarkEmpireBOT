const { OnMessage } = require("./warnings/warner.js");

const { Client, Collection, Intents } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const {
  token,
  clientId,
  guildId,
} = require("./config.json");
const fs = require("fs");

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const DarkEmpire = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

DarkEmpire.commands = new Collection();
global.DungeonHelper = DarkEmpire;

DarkEmpire.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (!DarkEmpire.commands.has(commandName)) return;

  try {
    await DarkEmpire.commands.get(commandName).execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.editReply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

DarkEmpire.on("messageCreate", (message) => OnMessage(message));

const Fetch = () => {
  const commands = [];

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "9" }).setToken(token);

  (async () => {
    try {
      console.log("[!]: Fetch started");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      });

      console.log("[!]: Fetch endend");
    } catch (error) {
      console.error(error);
    }
  })();
};

const Start = () => {
  Fetch();

  DarkEmpire.login(token);

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    DarkEmpire.commands.set(command.data.name, command);
  }
};

DarkEmpire.on("ready", () => {
  console.log("[>]: Bot online");

  /* setInterval(() => {
    // generate random number between 1 and list length.
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];

    bot.user.setActivity(newActivity);
  }, 10000); */

  DarkEmpire.user.setActivity("moderare!", { type: "PLAYING" });
  DarkEmpire.user.setStatus("online");
});

Start();
