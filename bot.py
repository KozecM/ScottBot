import os

from discord.ext import commands
import random
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')

bot = commands.Bot(command_prefix='#')

# @client.event
# async def on_ready():
#   guild = discord.utils.get(client.guilds, name=GUILD)

#   print(
#       f'{client.user} is connected to the following guild:\n'
#       f'{guild.name} (id: {guild.id})'
#   )

#   members = '\n - '.join([member.name for member in guild.members])
  
#   print(f'Guild Members:\n - {members}')


@bot.command(name='no
')
async def nine_nine(ctx):
    brooklyn_99_quotes = [
        'I\'m the human form of the 💯 emoji.',
        'Bingpot!',
        (
            'Cool. Cool cool cool cool cool cool cool, '
            'no doubt no doubt no doubt no doubt.'
        ),
    ]

    response = random.choice(brooklyn_99_quotes)
    await ctx.send(response)

bot.run(TOKEN)