const { SlashCommandBuilder } = require("@discordjs/builders");
const { allowedEventRoles } = require("../config.json");
const templates = require("./templates.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("evento")
    .setDescription("Crea un nuovo evento")

    .addSubcommand((subcommand) =>
      subcommand
        .setName("nuovo")
        .setDescription("Crea un nuovo evento da zero")

        .addStringOption((option) =>
          option
            .setName("nome")
            .setDescription("Il nome dell'evento")
            .setRequired(true)
        )

        .addStringOption((option) =>
          option
            .setName("data")
            .setDescription("La data dell'evento (formato: YYYY-MM-DD hh:mm)")
            .setRequired(true)
        )

        .addChannelOption((option) =>
          option
            .setName("canale")
            .setDescription("Il canale in cui verrà effettuato l'evento")
            .setRequired(true)
        )

        .addStringOption((option) =>
          option
            .setName("descrizione")
            .setDescription("La descrizione dell'evento")
            .setRequired(false)
        )
    )

    .addSubcommand((subcommand) =>
      subcommand
        .setName("template")
        .setDescription("Crea un nuovo evento da un template")

        .addStringOption((option) =>
          option
            .setName("nome")
            .setDescription("Il nome dell'evento")
            .setRequired(true)
            .addChoice("Amung Us", "amung_us")
        )

        .addStringOption((option) =>
          option
            .setName("data")
            .setDescription("La data dell'evento (formato: YYYY-MM-DD hh:mm)")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    if (isVerifiedUser(interaction.message.member)) {
      var event;
      if (interaction.subcommand.name === "nuovo") {
        event = newEvent(interaction);
      } else if (interaction.subcommand.name === "template") {
        event = newEventFromTemplate(interaction);
      }

      interaction.message.guild.scheduledEvents.create(event);

      interaction.message.reply("Evento creato");
    }
  },
};

function newEvent(interaction) {
  const { nome, canale, descrizione } = interaction.options;
  const data = getDateFromString(interaction.options.data);
  const guild = interaction.message.guild;

  if (!data) {
    interaction.message.reply("La data non è valida");
    return;
  }

  if (!checkChannel(guild, canale)) {
    interaction.message.reply("Il canale non è valido");
    return;
  }

  return {
    name: nome,
    scheduledStartTime: data,
    channel: canale,
    description: descrizione,
  };
}

function newEventFromTemplate(interaction) {
  const { nome } = interaction.options;
  const data = getDateFromString(interaction.options.data);

  if (!data) {
    interaction.message.reply("La data non è valida");
    return;
  }

  return {
    name: nome,
    scheduledStartTime: data,
    channel: templates.canale,
    description: templates.descrizione,
  };
}

function isVerifiedUser(user) {
  allowedEventRoles.forEach((role) => {
    if (user.roles.cache.has(role)) {
      return true;
    }
  });

  return false;
}

function getDateFromString(string) {
  const strings = string.split(" ");

  const dateTime = strings[0] + "T" + strings[1];

  return Date.parse(dateTime);
}

function checkChannel(guild, channelName) {
  return guild.channels.cache.has(channelName);
}
