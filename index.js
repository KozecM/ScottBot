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

    case 'help': {
      if(message.author.id == 316258648185765888){
        message.channel.send('Scott does not get to know the rules');
      }
      else{
        response = "```Welcome to help not scott! Here are all of the commands that you need to use me: \n-ping: respond pong \n-pong: respond ping\n-say: respond with any text after the command\n-give: give a star (only scott can give a star)\n-99: random 99 quote```"
        message.channel.send(response)
      }
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
  
    case '99': {
      brooklyn_99_quotes = [
        'I\'m the human form of the 💯 emoji.',
        'Bingpot!',
        (
            'Cool. Cool cool cool cool cool cool cool, ' +
            'no doubt no doubt no doubt no doubt.'
        ),
        'Title of your sex tape.',
        'Sarge, with all due respect, I am gonna completely ignore everything you just said.',
        'I ate one string bean. It tasted like fish vomit. That was it for me.',
        'The English language can not fully capture the depth and complexity of my thoughts, so I’m incorporating emojis into my speech to better express myself. Winky face.',
        'A place where everybody knows your name is hell. You’re describing hell.',
        'If I die, turn my tweets into a book.',
        'Fine. but in protest, I’m walking over there extremely slowly!',
        'Jake, why don’t you just do the right thing and jump out of a window?',
        'I asked them if they wanted to embarrass you, and they instantly said yes.',
        'Captain Wuntch. Good to see you. But if you’re here, who’s guarding Hades?',
        'I’m playing Kwazy Cupcakes, I’m hydrated as hell, and I’m listening to Sheryl Crow. I’ve got my own party going on.',
        'Anyone over the age of six celebrating a birthday should go to hell.',
        'Captain, turn your greatest weakness into your greatest strength. Like Paris Hilton RE: her sex tape.',
        'Jake, piece of advice: just give up. It’s the Boyle way. It’s why our family crest is a white flag.',
        'Okay, no hard feelings, but I hate you. Not joking. Bye',
        'Hello unsolved case. Do you bring me joy? No, because you’re boring and you’re too hard. See ya.',
        'Great, I’d like your $8-est bottle of wine, please.',
        'I don’t want to hang out with some stupid baby who’s never met Jake.',
        'Nothing’s okay. Wuntch is circling me like a shark frenzied by chum. The task force turning into a career-threatening quagmire. An Internal Affairs investigation casting doubt upon my integrity. And you ask, is everything okay? I am buffeted by the winds of my foe’s enmity and cast about by the towering waves of cruel fate. Yet I, a Captain, am no longer able to command my vessel, my precinct, from my customary helm, my office. And you ask, is everything okay? I’ve worked the better part of my years on earth overcoming every prejudice and fighting for the position I hold, and now I feel it being ripped from my grasp, and with it the very essence of what defines me as a man. And you ask, is everything okay?',
      ]

      response = brooklyn_99_quotes[Math.floor(Math.random() * brooklyn_99_quotes.length)];
      message.channel.send(response);

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