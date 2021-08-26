require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const prefix = 'k!';

// this part (taken from the discord.js guide) will import every single js file from the commands folder

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// node.js is event-driven
// it can execute funcs when smthn particular happens

// one way to do: client.once('ready', function () {})
client.once('ready', () => {
    console.log("Logged in as Kenjamin")
});

client.on('message', (message) => {
    // determining author isn't a bot, msg has a guild (server), and msg starts w prefix
    // if cond not met, return
    if (message.author.bot || message.guild === null || !message.content.startsWith(prefix)) return; 

    // breaks msg into args
    const args = message.content.slice(prefix.length).trim().split(/ +/); // this splits no matter how many spaces
    const command = args.shift().toLowerCase(); // gets command 

    if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
})

client.login(process.env.BOT_TOKEN); // use env var bc bot token = sensitive (like lowan)

