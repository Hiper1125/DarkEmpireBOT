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
            .setName("durata")
            .setDescription("La durata dell'evento")
            .setRequired(false)
            .addChoice("1 ora", "h1")
            .addChoice("2 ore", "h2")
            .addChoice("3 ore", "h3")
            .addChoice("4 ore", "h4")
            .addChoice("1 giorno", "h24")
            .addChoice("2 giorni", "h48")
            .addChoice("3 giorni", "h72")
            .addChoice("5 giorni", "h120")
            .addChoice("7 giorni", "h168")
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

        .addStringOption((option) =>
        option
          .setName("durata")
          .setDescription("La durata dell'evento")
          .setRequired(false)
          .addChoice("1 ora", "h1")
          .addChoice("2 ore", "h2")
          .addChoice("3 ore", "h3")
          .addChoice("4 ore", "h4")
          .addChoice("1 giorno", "h24")
          .addChoice("2 giorni", "h48")
          .addChoice("3 giorni", "h72")
          .addChoice("5 giorni", "h120")
          .addChoice("7 giorni", "h168")
      )
    ),

  async execute(interaction) {
    if (isUserAllowed(interaction.message.member)) {
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

const newEvent = (interaction) => {
  const { nome, canale, giorno, ora, minuti, orario, durata, descrizione } =
    interaction.options;
    
  const dataInizio = getDate(giorno, ora, minuti, orario);
  const dataFine = dataInizio.clone();
  dataFine.setHours(dataFine.getHours() + parseInt(durata.replace("h", "")));
  
  const guild = interaction.message.guild;

  if (!dataInizio) {
    interaction.message.reply("La data non è valida");
    return;
  }

  if (!checkChannel(guild, canale)) {
    interaction.message.reply("Il canale non è valido");
    return;
  }

  return {
    name: nome,
    scheduledStartTime: dataInizio,
    scheduledEndTime: dataFine,
    channel: canale,
    description: descrizione,
  };
}

const newEventFromTemplate = (interaction) => {
  const { nome, giorno, ora, minuti, orario, durata } = interaction.options;
  const dataInizio = getDate(giorno, ora, minuti, orario);
  const dataFine = dataInizio.clone();
  dataFine.setHours(dataFine.getHours() + parseInt(durata.replace("h", "")));

  if (!dataInizio) {
    interaction.message.reply("La data non è valida");
    return;
  }

  const guild = interaction.message.guild;
  const categoryId = templates[nome].categoria;
  channel = getFirstFreeChannel(guild, categoryId);

  return {
    name: templates[nome].nome,
    scheduledStartTime: dataInizio,
    scheduledEndTime: dataFine,
    channel: channel,
    description: templates[nome].descrizione,
  };
}

const getFirstFreeChannel = (guild, categoryId) => {
  const events = guild.scheduledEvents.cache.filter(event => event.channel.parentId === categoryId);
  const voiceChannels = guild.channels.cache.get(categoryId).children.filter(c => c.type === "GUILD_VOICE");

  voiceChannels.forEach(channel => {
    if (!events.find(event => event.channel === channel.id)) {
      return channel;
    }
  });

  // ? se non trovo un canale libero vuoi un errore?
}

const isUserAllowed = (user) => {
  allowedEventRoles.forEach((role) => {
    if (user.roles.cache.has(role)) {
      return true;
    }
  });

  return false;
}

const getDate = (giorno, ora, minuti, orario) => {
  const date = new Date();
  const days = parseInt(giorno.replace("d", ""));

  date.setDate(date.getDate() + days);

  date.setHours(parseInt(ora.replace("h", "")) + orario === "pm" ? 12 : 0);
  date.setMinutes(parseInt(minuti.replace("m", "")));
  date.setSeconds(0);

  return date;
}

const checkChannel = (guild, channelName) => {
  const channel = guild.channels.cache.find(c => c.name === channelName && c.type === "GUILD_VOICE");
  return channel !== null;
}