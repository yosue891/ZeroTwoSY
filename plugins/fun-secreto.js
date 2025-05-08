import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  const secreto = text?.trim().split(' ').slice(1).join(' ');
  if (!secreto) throw 'Debes escribir tu secreto después de "secreto".';

  const url = `https://maycolaiultramd-secretos-api.onrender.com/MaycolAIUltraMD?secreto=${encodeURIComponent(secreto)}`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    const respuesta = json?.respuesta || 'Secreto registrado correctamente.';

    const texto = `
╭───〔  𖣔  〕───⛩️
│ *Hanako-kun ha escuchado tu secreto...*
│
│ 『✧』 ${respuesta}
│
│  > Toca el Banner si quieres ver tu secreto
╰─────────────────⛩️`;

    await conn.sendMessage(m.chat, {
      text: texto,
      contextInfo: {
        externalAdReply: {
          title: 'Tu secreto ha sido registrado',
          body: 'MaycolAIUltraMD • SoyMaycol',
          thumbnailUrl: 'https://files.catbox.moe/rgi9f7.jpeg',
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceUrl: 'https://maysecretos.onrender.com/'
        }
      }
    }, { quoted: m });
  } catch (e) {
    await m.reply('Hubo un error al registrar el secreto. Intenta nuevamente más tarde.');
  }
};

handler.help = ['secreto soy un gato'];
handler.tags = ['fun'];
handler.command = ['secreto'];
handler.group = false;
handler.register = true;

export default handler;
