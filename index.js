require('dotenv').config();

console.log(process.env.DISCORD_TOKEN);
// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
// This is sometimes called 'bot', but 'client' is prefered
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = process.env.DISCORD_TOKEN;

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord after ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.channel.type != 'text' || message.author.bot || !message.content.startsWith('#'))
    return;
  
  let command = message.content.split(' ')[0].slice(1);

  let args = message.content.replace('#' + command, '').trim();


  switch (command) {
    case 'ping':
      message.channel.send('pong');
      break; 
  
    case 'pong':
      message.channel.send('ping');
      break;
  
    case 'say': {
      let sentence = message.content.replace('#' + command, '').trim();
      message.channel.send(sentence); 
      break;
    }

    case 'give': {
      if(message.author.id == 316258648185765888){
        message.channel.send('Hey Scott! I\'ll add that star right now!');
        let person = message.content.replace('#' + command, '').trim();
        if (person.includes("<@!")) {
          person = person.split("!")[1].split(">")[0];
          user = message.guild.member(person)
          current_name = user.nickname;

          if(current_name.slice(-1) != "🌟"){
            current_name += " 🌟"
            user.setNickname(current_name)
          }
        }
        
      }
      else{
        message.channel.send('NO! YOU ARE NOT SCOTT')
      }
      break;
    }
  
    case 'test': {
      let sentence = 'brackets are useful';
      console.log(sentence);
      break;
    }
  }
});

// Log our bot in
client.login(token);