const mineflayer = require('mineflayer');
const { Groq } = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const bot = mineflayer.createBot({
  host: 'Zox_smp_655.aternos.me',
  port: 13148,
  username: 'ZOX_AI',
  version: '1.21.1'
});

bot.once('spawn', () => { bot.chat('ZOX_AI Online hai bhai 🔥'); });

bot.on('messagestr', async (message, author) => {
  if (author === bot.username) return;
  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'llama3-8b-8192',
    });
    bot.chat(completion.choices[0]?.message?.content || 'Samajh nahi aya');
  } catch (err) { bot.chat('Groq error aa gaya yaar'); }
});