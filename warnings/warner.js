const {
  prefix,
  wickBotId,
  outputChannelId,
  allowedCommands,
} = require("../config.json");

const OnMessage = (message) => {
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
        try {
          if (wickResponse.embeds[0].description != null) {
            let commandResult = wickResponse.embeds[0].description;

            if (!commandResult.includes("nsuccessful")) {
              if (
                commandResult.includes("has been") ||
                commandResult.includes("successful")
              ) {
                SendCommandResult(wickResponse, commandData, message.author);
              }
            } else {
              let operationResults = commandResult.split("uccessful");

              let successfulResult = parseInt(
                operationResults[1].split("`")[1].match(/\d/g).join(""),
                10
              );
              let unsuccessfulResult = parseInt(
                operationResults[2].split("`")[1].match(/\d/g).join(""),
                10
              );

              if (successfulResult > 0) {
                SendCommandResult(wickResponse, commandData, message.author);
              }
            }
          }
        } catch (error) {
          console.log("[!]: Collector error");
        }
      }
    });
  });
};

const SendCommandResult = (wickResponse, commandData, user) => {
  if (allowedCommands.includes(commandData[0])) {
    let formattedOutput = "Attenzione, ";

    //ottnere target ID in base a quello che c'è nel command data
    //potrebbe esserci un ID, una menzione, o un nome parziale con cui fare la ricerca

    let targetID = "";

    formattedOutput += "<@" + targetID + "> ";

    if (commandData[0] == "ban" || commandData[0] == "b") {
      formattedOutput += "è stato bannato da ";
    } else if (commandData[0] == "kick" || commandData[0] == "k") {
      formattedOutput += "è stato espulso da ";
    } else if (commandData[0] == "mute" || commandData[0] == "m") {
      formattedOutput += "è stato mutato da ";
    } else if (commandData[0] == "unmute" || commandData[0] == "um") {
      formattedOutput += "è stato smutato da ";
    } else if (commandData[0] == "quarantine" || commandData[0] == "q") {
      formattedOutput += "è stato bloccato da ";
    } else if (commandData[0] == "unquarantine" || commandData[0] == "uq") {
      formattedOutput += "è stato sbloccato da ";
    } else if (commandData[0] == "timeout" || commandData[0] == "t") {
      formattedOutput += "è stato sospeso da ";
    } else if (commandData[0] == "warn" || commandData[0] == "w") {
      formattedOutput += "ha ricevuto un'avvertimento da ";
    }

    formattedOutput += "<@" + user.id + ">";

    //se c'è un ?t
    //formattedOutput += per x tempo (10 giorni, 20 ore)

    //se è un perma ban, o se è soft, o se è un tempban

    formattedOutput += "!";

    //in base al outputChannel inviare il messaggio
  }

  wickResponse.channel.send("E' stato effettuato un " + commandData[0]);
};

module.exports = { OnMessage };
