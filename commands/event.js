const { SlashCommandBuilder } = require("@discordjs/builders");
const { allowedEventRoles } = require("../config.json");

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
      if (interaction.subcommand.name === "nuovo") {
        newEvent(interaction);
      }
    }
  },
};

function isVerifiedUser(user) {
  allowedEventRoles.forEach(role => {
    if (user.roles.cache.has(role)) {
      return true;
    }
  });

  return false;
}

function newEvent (interaction) {
}

function newEventFromTemplate (interaction) {
}