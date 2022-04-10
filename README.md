# 💀 Dark Empire Bot

A discord bot made for events scheduling completely free to download 🧙🏻‍♂️

- If you need help with this project, you can join our discord server by just clicking [here](https://discord.gg/hKFFG2JD9M).
- If you don't have any development knowledge, we suggest you to join our Discord server to get help.*

### 📓 Features

Here are some of the main features of the bot

- Create an event from a template (/evento template `tipo: Among Us` `tipo: Among Us` `giorno: oggi` `ora: alle due` `minuti: in punto` `orario: PM` `durata: 3 ore`) 
- Create a brand new ebent (/evento nuovo `nome: Brawlhalla` `giorno: domani` `ora: alle otto` `minuti: e mezza` `orario: PM` `canale: Canale eventi` `tipo: Canale palco`)

### ⚡ Configuration

Open the main configuration file located in the main folder `config.json`.

```json
{
    "token": "",
    "clientId": "",
    "guildId": "",
    "allowedEventRoles": [""],  
    "eventChannelId": "",
}
```

Open the templates configuration file located in the main folder `templates.json`.

```json
{
    "template_name": {
        "nome": "",
        "descrizione": "",
        "categoria": "",
        "immagine": ""
    }
}
```

Basic config.json configuration

- `token`, the token of your bot available on the [Discord Developers](https://discordapp.com/developers/applications) section
- `clientId`, the client id of the application also available on the [Discord Developers](https://discordapp.com/developers/applications) section
- `guildId`, the id of the discord server you want the bot to run in
- `allowedEventRoles`, an array of roles id of roles you want give bot events commands access to 
- `eventChannelId`, the id of the channel you want the event embed message to be sent to

Basic templates.json configuration

1) Copy and paste the exemple above to the templates.json file adding one more item to the array (max 25)
2) Change the `template_name` to the actual name of your template
3) Then edit the parameters of the template: 
-     `nome` is the name of the event that will be create running /evento template
-     `descrizione` is the description of the event ...
-     `categoria` is the id of the category you want the bot takes channels for schedule the event in
-     `immagine` is an url to an image that will be embed with the others event informations

### 💻 Environement

To run the project correctly you will need to import some libraries.

- [Node JS](https://nodejs.org/en/) (v16 or higher) for the environment
- [@discordjs/builders](https://www.npmjs.com/package/@discordjs/builders) for the slash commands

# 📑 License
We use a standard [MIT](https://github.com/Hiper1125/dnd-bot/blob/main/LICENSE) license.
Please do not withdraw the license and keep the credits on this project.

# 👤 Authors
Made by [HIPER#1125](https://github.com/Hiper1125) and [XedaGmr#5016](https://github.com/XedaGmr) with ❤️
