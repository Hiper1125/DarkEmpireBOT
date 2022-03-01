const { Client, Collection, Intents } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const {
  token,
  clientId,
  guildId,
  prefix,
  wickBotId,
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

DarkEmpire.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix)) return;

  let commandData = message.content.substring(1).split(" ");

  let filter = (m) => m.author.id === wickBotId;

  const collector = message.channel.createMessageCollector({
    filter,
    time: 11000,
  });

  collector.on("collect", (m) => {
    console.log(`[+]: Collected from ${m.author.username}`);
  });

  collector.on("end", (collected) => {
    console.log(`[+]: Collected ${collected.size} items`);

    collected.forEach((wickResponse) => {
      if (wickResponse.embeds) {
        try{

            if (wickResponse.embeds[0].description != null) {
            }
    
            if (
              wickResponse.embeds[0].description.includes("has been") ||
              wickResponse.embeds[0].description.includes("successful")
            ) {
              wickResponse.channel.send("E' stato effettuato un " + commandData[0]);
            }
        }
        catch(error)
        {
            console.log("[!]: Collector error")
        }

      }
    });
  });
});

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

  DarkEmpire.user.setActivity("moderare!", { type: "PLAYING" });
  DarkEmpire.user.setStatus("dnd");
});

Start();