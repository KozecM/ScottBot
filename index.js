require('dotenv').config();
const fs = require('fs')

// Import the discord.js module
const {Client, EmbedBuilder, GatewayIntentBits, Events} = require('discord.js');


// Create an instance of a Discord client
// This is sometimes called 'bot', but 'client' is prefered
const client = new Client({
  intents:[
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord after ready is emitted
client.once(Events.ClientReady, () =>{
  console.log("I am ready!")
})


fs.readFile('CurrentStar.txt', 'utf-8', (err, fd) => {
  if (err) throw err
})


// Create an event listener for messages
client.on("messageCreate", (message) => {

  if (message.channel.type != 0 || message.author.bot || !message.content.startsWith('$'))
    return;
	
  let command = message.content.split(' ')[0].slice(1);
  
  let args = message.content.replace('$' + command, '').trim();
  

  switch (command) {
    case 'ping':
      message.channel.send('pong');
      break; 
  
    case 'pong':
      message.channel.send('ping');
      break;
  
    case 'say': {
      let sentence = message.content.replace('$' + command, '').trim();
      message.channel.send(sentence); 
      break;
    }

    case 'game?': {
      let answer = (Math.floor(Math.random()*2) == 1)? "yes" : "no";
      message.channel.send(answer);
      break;
    }

    case 'help': {
      if(message.author.id == 316258648185765888){
        message.channel.send('Scott does not get to know the rules');
      }
      else{
        response = "```Welcome to help not scott! Here are all of the commands that you need to use me:" + 
          "\n$ping: respond pong \n$pong: respond ping"+
          "\n$say: respond with any text after the command"+
          "\n$give: give a star (only scott can give a star)"+
          "\n$poll: start a poll takes the arguments: \"title\" \"option 1\" \"option 2\" \"option 3\""
          "\n$99: random 99 quote```"
        message.channel.send(response)
      }
      break;
    }

    case 'give': {
      if(message.author.id != 316258648185765888){
        message.channel.send('Hey ' + message.author.toString() + '! I\'ll add that star right now!');
        let person = message.mentions.members.first();
        console.log(person.nickname);
        if (person) {
          current_name = person.displayName;
          console.log(current_name);

          fs.readFile('CurrentStar.txt', 'utf-8', (err, data) => { 
            if (err) throw err; 
    
            if(person.id != data){
              message.guild.members.fetch(data)
              .then(old_user => {
                console.log(old_user.nickname);
                old_user_name = old_user.displayName;
                old_user_name = old_user_name.split("🌟")[0];
                old_user.setNickname(old_user_name);
                fs.writeFile('CurrentStar.txt', person.id, (err) => {
                  if (err) throw err;
                  console.log("successfully written")
                })
              
              })
              .catch(err=> {
                console.log("ERROR: " + err);
              });

              current_name = current_name + " 🌟"
              console.log(current_name)
              person.setNickname(current_name)
            }
            
            
          })
        }
        
      }
      else{
        message.channel.send('NO SCOTT')
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
        'we\'re in a sewer I\'m gon\'st\'a talk about the turtles',
        'Yeah I\'m gunsta Terry quit being such a Malfoy',
        'I don’t want to hang out with some stupid baby who’s never met Jake.',
        'Nothing’s okay. Wuntch is circling me like a shark frenzied by chum. The task force turning into a career-threatening quagmire. An Internal Affairs investigation casting doubt upon my integrity. And you ask, is everything okay? I am buffeted by the winds of my foe’s enmity and cast about by the towering waves of cruel fate. Yet I, a Captain, am no longer able to command my vessel, my precinct, from my customary helm, my office. And you ask, is everything okay? I’ve worked the better part of my years on earth overcoming every prejudice and fighting for the position I hold, and now I feel it being ripped from my grasp, and with it the very essence of what defines me as a man. And you ask, is everything okay?',
      ]

      response = brooklyn_99_quotes[Math.floor(Math.random() * brooklyn_99_quotes.length)];
      message.channel.send(response);

      break;
    }

    case 'poll': {
      message.delete({timeout: 1000})
      let commands = message.content.replace('$' + command, '').trim().match(/\w+|"[^"]+"/g);
      const pollEmbed = new EmbedBuilder()
        .setColor('#B000B5');
      
      let title = commands[0]
      let options = commands.slice(1);
      let alphabet = ['🇦', '🇧', '🇨', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶'];

      pollEmbed.setTitle(title.split('"').join(''));
      var num = 0;
      for(const option in options) {
        letter = 97 + num
        
        temp = ":regional_indicator_"+ String.fromCharCode(letter) + ":";
        var optionString = temp + " " + options[option];
        pollEmbed.addFields({name: optionString, value: "\u200b", inline: false});
        num += 1;
      }
      
      message.channel.send({embeds:[pollEmbed]})
        .then(message => {
          for(i = 0; i<options.length; i ++){
            testEmoji =alphabet[i];
            message.react(testEmoji);
          }
        });

        break;
    }

    case 'test': {
      console.log("test place")
      break;
    }
  }
});

client.login(process.env.DISCORD_TOKEN)
