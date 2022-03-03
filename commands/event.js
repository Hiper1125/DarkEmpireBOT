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
            .addChoice("oggi", "d0")
            .addChoice("domani", "d1")
            .addChoice("dopodomani", "d2")
            .addChoice("tra 3 giorni", "d3")
            .addChoice("tra 4 giorni", "d4")
            .addChoice("tra 5 giorni", "d5")
            .addChoice("tra 6 giorni", "d6")
            .addChoice("la prossima settimana", "d7")
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
            .addChoice("e quarantacinque", "m45")
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
            .addChoice("oggi", "d0")
            .addChoice("domani", "d1")
            .addChoice("dopodomani", "d2")
            .addChoice("tra 3 giorni", "d3")
            .addChoice("tra 4 giorni", "d4")
            .addChoice("tra 5 giorni", "d5")
            .addChoice("tra 6 giorni", "d6")
            .addChoice("la prossima settimana", "d7")
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
            .addChoice("e quarantacinque", "m45")
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
    if (isUserAllowed(interaction.member)) {
      const event = createEvent(interaction);

      if (event) {
        interaction.guild.scheduledEvents.create(event);
        interaction.reply("Evento creato");
      }
    } else {
      interaction.reply("Cazzo vuoi? mica sei l'owner!");
    }
  },
};

const createEvent = (interaction) => {
  const isNew = interaction.options.getSubcommand() === "nuovo";
  const options = getOptions(interaction);

  const guild = interaction.guild;

  var event = {
    name: isNew ? options.nome : templates[options.nome].nome,
    privacyLevel: 2,
    entityType: 2,
    description: isNew
      ? options.descrizione
      : templates[options.nome].descrizione,
  };

  const dataInizio = getDate(
    options.giorno,
    options.ora,
    options.minuti,
    options.orario
  );

  if (dataInizio.getTime() > Date.now()) {
    event.scheduledStartTime = dataInizio;
  } else {
    interaction.reply("Non puoi creare un evento in passato");
    return;
  }

  if (options.durata) {
    const dataFine = new Date(dataInizio.getTime());
    dataFine.setHours(
      dataFine.getHours() + parseInt(options.durata.replace("h", ""))
    );

    event.scheduledEndTime = dataFine;
  }

  if (isNew) {
    if (checkChannel(guild, options.canale)) {
      interaction.reply("Il canale non è valido");
      return;
    } else {
      event.channel = options.canale;
    }
  } else {
    const channel = getFirstFreeChannel(
      guild,
      templates[options.nome].categoria
    );

    if (channel) {
      event.channel = channel;
    } else {
      interaction.reply("Non c'è nessun canale disponibile");
    }
  }

  return event;
};

const getOptions = (interaction) => {
  var options;

  if (interaction.options.getSubcommand() === "nuovo") {
    options = {
      nome: interaction.options.getString("nome"),
      giorno: interaction.options.getString("giorno"),
      ora: interaction.options.getString("ora"),
      minuti: interaction.options.getString("minuti"),
      orario: interaction.options.getString("orario"),
      durata: interaction.options.getString("durata"),
      descrizione: interaction.options.getString("descrizione"),
      canale: interaction.options.getChannel("canale"),
    };
  } else if (interaction.options.getSubcommand() === "template") {
    options = {
      nome: interaction.options.getString("tipo"),
      giorno: interaction.options.getString("giorno"),
      ora: interaction.options.getString("ora"),
      minuti: interaction.options.getString("minuti"),
      orario: interaction.options.getString("orario"),
      durata: interaction.options.getString("durata"),
    };
  }

  return options;
};

const getFirstFreeChannel = (guild, categoryId) => {
  const events = guild.scheduledEvents.cache.filter(
    (event) => event.channel.parentId === categoryId
  );
  const voiceChannels = guild.channels.cache
    .get(categoryId)
    .children.filter((c) => c.type === "GUILD_VOICE");

  voiceChannels.forEach((channel) => {
    if (!events.find((event) => event.channel === channel.id)) {
      return channel;
    }
  });
};

const isUserAllowed = (user) => {
  for (const role of allowedEventRoles) {
    if (user.roles.cache.has(role)) {
      return true;
    }
  }

  return false;
};

const getDate = (giorno, ora, minuti, orario) => {
  const date = new Date();
  const days = parseInt(giorno.replace("d", ""));

  date.setDate(date.getDate() + days);

  const hour =
    parseInt(ora.replace("h", ""), 10) + (orario === "pm" ? 12 : 0) + 1; // +1 cuz yes (maybe cuz è l'orario italiano)

  date.setHours(hour);
  date.setMinutes(parseInt(minuti.replace("m", "")));
  date.setSeconds(0);

  return date;
};

const checkChannel = (guild, channelName) => {
  const channel = guild.channels.cache.find(
    (c) => c.name === channelName && c.type === "GUILD_VOICE"
  );
  return channel !== null;
};
