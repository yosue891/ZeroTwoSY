import stringSimilarity from 'string-similarity';

export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === "bot") return;

  const allCommands = Object.values(global.plugins)
    .flatMap(plugin => plugin.command ? (Array.isArray(plugin.command) ? plugin.command : [plugin.command]) : []);
  
  const isValid = allCommands.includes(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];

  if (isValid) {
    if (chat.isBanned) {
      const avisoDesactivado = `╭─❍「 ✦ 𝙷𝚊𝚗𝚊𝚔𝚘-𝚔𝚞𝚗 ✦ 」\n│\n├─ El poder de Hanako ha sido *sellado* en este grupo.\n│\n├─ Invoca su regreso con:\n│   ⇝ *${usedPrefix}bot on*\n│\n╰─✦`;
      await m.reply(avisoDesactivado);
      return;
    }

    if (!user.commands) user.commands = 0;
    user.commands += 1;

  } else {
    const comando = m.text.trim().split(' ')[0];

    const matches = stringSimilarity.findBestMatch(command, allCommands);
    const similars = matches.ratings
      .filter(r => r.rating > 0.3)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3)
      .map(r => `⇝ *${usedPrefix}${r.target}*`)
      .join('\n');

    const respuesta = `
╭─❍「 ✦ 𝙷𝚊𝚗𝚊𝚔𝚘-𝚔𝚞𝚗 ✦  」 
│  
├─ El hechizo *${comando}* no existe entre los registros espirituales.
${similars ? `├─ ¿Quisiste decir?\n${similars}` : '├─ Ningún hechizo similar encontrado...'}
│  
├─ Consulta los conjuros disponibles con:
│   ⇝ *${usedPrefix}help*
╰─✦
`.trim();

    await m.reply(respuesta);
  }
}
