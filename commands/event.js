const { SlashCommandBuilder } = require("@discordjs/builders");
const { allowedEventRoles } = require("../config.json");
const templates = require("../templates.json");

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
            .setName("giorno")
            .setDescription("Il giorno dell'evento")
            .setRequired(true)
            .addChoice("oggi", "day0")
            .addChoice("domani", "day1")
            .addChoice("dopodomani", "day2")
            .addChoice("tra 3 giorni", "day3")
            .addChoice("tra 4 giorni", "day4")
            .addChoice("tra 5 giorni", "day5")
            .addChoice("tra 6 giorni", "day6")
            .addChoice("la prossima settimana", "day7")
        )

        .addStringOption((option) =>
          option
            .setName("ora")
            .setDescription("L'ora dell'evento")
            .setRequired(true)
            .addChoice("all'una", "h1")
            .addChoice("alle due", "h2")
            .addChoice("alle tre", "h3")
            .addChoice("alle quattro", "h4")
            .addChoice("alle cinque", "h5")
            .addChoice("alle sei", "h6")
            .addChoice("alle sette", "h7")
            .addChoice("alle otto", "h8")
            .addChoice("alle nove", "h9")
            .addChoice("alle dieci", "h10")
            .addChoice("alle undici", "h11")
            .addChoice("alle dodici", "h12")
        )

        .addStringOption((option) =>
          option
            .setName("minuti")
            .setDescription("I minuti dell'evento")
            .setRequired(true)
            .addChoice("in punto", "m0")
            .addChoice("e dieci", "m10")
            .addChoice("e un quarto", "m15")
            .addChoice("e mezza", "m30")
            .addChoice("e un quarto", "m45")
        )

        .addStringOption((option) =>
          option
            .setName("orario")
            .setDescription("L'orario dell'evento")
            .setRequired(true)
            .addChoice("AM", "am")
            .addChoice("PM", "pm")
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
            .setName("tipo")
            .setDescription("Il tipo di evento da creare")
            .setRequired(true)
            .addChoice("Amung Us", "amung_us")
            .addChoice("Gartic Phone", "gartic_phone")
        )

        .addStringOption((option) =>
          option
            .setName("giorno")
            .setDescription("Il giorno dell'evento")
            .setRequired(true)
            .addChoice("oggi", "day0")
            .addChoice("domani", "day1")
            .addChoice("dopodomani", "day2")
            .addChoice("tra 3 giorni", "day3")
            .addChoice("tra 4 giorni", "day4")
            .addChoice("tra 5 giorni", "day5")
            .addChoice("tra 6 giorni", "day6")
            .addChoice("la prossima settimana", "day7")
        )

        .addStringOption((option) =>
          option
            .setName("ora")
            .setDescription("L'ora dell'evento")
            .setRequired(true)
            .addChoice("all'una", "h1")
            .addChoice("alle due", "h2")
            .addChoice("alle tre", "h3")
            .addChoice("alle quattro", "h4")
            .addChoice("alle cinque", "h5")
            .addChoice("alle sei", "h6")
            .addChoice("alle sette", "h7")
            .addChoice("alle otto", "h8")
            .addChoice("alle nove", "h9")
            .addChoice("alle dieci", "h10")
            .addChoice("alle undici", "h11")
            .addChoice("alle dodici", "h12")
        )

        .addStringOption((option) =>
          option
            .setName("minuti")
            .setDescription("I minuti dell'evento")
            .setRequired(true)
            .addChoice("in punto", "m0")
            .addChoice("e dieci", "m10")
            .addChoice("e un quarto", "m15")
            .addChoice("e mezza", "m30")
            .addChoice("e un quarto", "m45")
        )

        .addStringOption((option) =>
          option
            .setName("orario")
            .setDescription("L'orario dell'evento")
            .setRequired(true)
            .addChoice("AM", "am")
            .addChoice("PM", "pm")
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
    name: templates[nome].nome,
    scheduledStartTime: data,
    channel: templates[nome].canale,
    description: templates[nome].descrizione,
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