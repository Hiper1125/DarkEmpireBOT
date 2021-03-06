const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { allowedEventRoles, eventChannelId } = require("../config.json");
const { telegramToken, telegramChannelId } = require("../config.json");
const request = require("sync-request");

const getTemplates = () => {
  var res = request("GET", "https://api.npoint.io/8d79844dd1349f9c0bd6");
  return JSON.parse(res.getBody('utf8'));
};

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
            .setDescription("Il canale in cui verr?? effettuato l'evento")
            .setRequired(true)
        )

        .addStringOption((option) =>
          option
            .setName("tipo")
            .setDescription(
              "Il tipo di canale in cui verr?? effettuato l'evento"
            )
            .setRequired(true)
            .addChoice("Canale vocale", "canale2")
            .addChoice("Canale palco", "canale1")
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

        .addStringOption((option) =>
          option
            .setName("immagine")
            .setDescription("L'URL per l'immagine di copertina")
            .setRequired(false)
        )
    )

    .addSubcommand((subcommand) =>
      subcommand
        .setName("template")
        .setDescription("Crea un nuovo evento da un template")
        .addStringOption((option) => {
          option
            .setName("tipo")
            .setDescription("Il tipo di evento da creare")
            .setRequired(true);

          const templates = getTemplates();
          for (let [key, template] of Object.entries(templates)) {
            option.addChoice(template.nome, key);
          }

          return option;
        })

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
      try {
        const eventData = createEvent(interaction);

        const event = await interaction.guild.scheduledEvents.create(eventData);
        await interaction.reply("Evento creato");

        channel = interaction.guild.channels.cache.get(eventChannelId);
        const user = interaction.user;

        const embed = new MessageEmbed();

        embed
          .setColor("202225")
          .setTitle("Clicca per partecipare")
          .setURL(event.url)
          .setAuthor({ name: user.tag, iconURL: user.avatarURL() })
          .addFields(
            { name: "Tipo evento", value: event.name, inline: true },
            {
              name: "Data evento",
              value:
                "<t:" +
                Math.floor(eventData.scheduledStartTime.getTime() / 1000) +
                ">",
              inline: true,
            },
            { name: "Creatore", value: "<@" + user.id + ">", inline: true }
          )
          .setFooter({ text: user.tag, iconURL: user.avatarURL() })
          .setTimestamp(event.scheduledStartTimestamp);

        if (event.description) {
          embed.addFields({ name: "Descrizione", value: event.description });
        }

        let immagine = null;

        if (interaction.options.getSubcommand() === "template") {
          if (templates[interaction.options.getString("tipo")].immagine) {
            immagine =
              templates[interaction.options.getString("tipo")].immagine;
          }
        } else if (interaction.options.getString("immagine")) {
          immagine = interaction.options.getString("immagine");
        }

        embed.setThumbnail(immagine);

        const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setLabel("Dettagli evento")
              .setStyle("LINK")
              .setURL(event.url)
          )
          .addComponents(
            new MessageButton()
              .setCustomId("delete_" + event.id)
              .setLabel("Cancella evento")
              .setStyle("DANGER")
          );

        await channel.send({
          embeds: [embed],
          content: "Hey @everyone, nuovo evento!",
          components: [row],
        });

        sendToTelegram("Nuovo evento: " + event.name, event.url, immagine);

        const filter = (btnInteraction) => {
          return isUserAllowed(btnInteraction.member);
        };
        const collector = channel.createMessageComponentCollector({ filter });

        collector.on("collect", async (btnInteraction) => {
          const guild = btnInteraction.guild;

          if (btnInteraction.customId.includes("delete")) {
            const options = btnInteraction.customId.split("_");
            if (guild.scheduledEvents.cache.has(options[1])) {
              guild.scheduledEvents.cache.get(options[1]).delete();
            }
            btnInteraction.message.delete();
          }
        });
      } catch (error) {
        console.log(error);
        interaction.reply(error);
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

  let tipoStr = "";

  let tipo = 2;

  if (isNew) {
    tipoStr += options.tipo.replace("canale", "");
    tipo = parseInt(tipoStr);
  }

  var event = {
    name: isNew ? options.nome : templates[options.nome].nome,
    privacyLevel: 2,
    entityType: tipo,
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
    throw "Non puoi creare un evento in passato";
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
      event.channel = options.canale;
    } else {
      throw "Il canale non ?? valido";
    }
  } else {
    const channel = getFirstFreeChannel(
      guild,
      templates[options.nome].categoria
    );

    if (channel) {
      event.channel = channel;
    } else {
      throw "Non c'?? nessun canale disponibile";
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
      tipo: interaction.options.getString("tipo"),
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

  for (const c of voiceChannels) {
    channel = c[1];
    if (!events.find((event) => event.channelId === channel.id)) {
      return channel.id;
    }
  }
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

  const hour = parseInt(ora.replace("h", ""), 10) + (orario === "pm" ? 12 : 0);

  date.setHours(hour);
  date.setMinutes(parseInt(minuti.replace("m", "")));
  date.setSeconds(0);

  return date;
};

const checkChannel = (guild, channelId) => {
  const channel = guild.channels.cache.find(
    (c) => c.id === channelId && c.type === "GUILD_VOICE"
  );
  return channel !== null;
};

const sendToTelegram = (message, eventLink, image) => {
  const { Telegraf, Markup } = require("telegraf");
  const TelgramBot = new Telegraf(telegramToken);

  const buttons = Markup.inlineKeyboard([
    Markup.button.url("Dettagli evento", eventLink),
  ]);

  TelgramBot.telegram.sendPhoto(telegramChannelId, image, {
    caption: message,
    parse_mode: "MarkdownV2",
    reply_markup: buttons.reply_markup,
  });
};
