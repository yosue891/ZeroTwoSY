import fetch from 'node-fetch';

const handler = async (m, { text, conn }) => {
  if (!text) {
    return conn.reply(m.chat, `
✘ 「 𝑻𝑰́𝑻𝑼𝑳𝑶 𝑭𝑨𝑳𝑻𝑨𝑵𝑻𝑬 」
➤ Usa: *peliculamp4 <título>*`, m);
  }

  const apiUrl = `https://nightapioficial.onrender.com/api/movies/info?title=${encodeURIComponent(text)}`;

  await conn.reply(m.chat, `
╭──〔 ✦ 𝑯𝑨𝑵𝑨𝑲𝑶-𝑲𝑼𝑵 𝑬𝑺𝑻𝑨́ 𝑬𝑿𝑷𝑳𝑶𝑹𝑨𝑵𝑫𝑶... ✦ 〕──╮
┃⌛ Buscando entre los archivos malditos de NightAPI...
┃✨ Encontrando la esencia de *${text}*...
╰──────────────────────────────╯`, m);

  try {
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!Array.isArray(json) || json.length === 0 || !json[0].enlace) {
      throw new Error('No se encontró ningún resultado.');
    }

    const movie = json[0];
    const url = movie.enlace;

    // Validamos que la URL del video responda
    const head = await fetch(url, { method: 'HEAD' });
    if (!head.ok) throw new Error('El enlace del video no responde.');

    const caption = `
╭─〔 ✦ 𝑷𝑬𝑳𝑰́𝑪𝑼𝑳𝑨 𝑬𝑵𝑪𝑶𝑵𝑻𝑹𝑨𝑫𝑨 ✦ 〕─╮
┃🎬 *Título:* ${movie.nombre}
┃📅 *Año:* ${movie.año}
┃⭐ *Estrellas:* ${movie.estrellas}
╰────────────────────────────╯
`.trim();

    // Intentar enviar el video
    await conn.sendMessage(m.chat, {
      video: { url },
      mimetype: 'video/*',
      caption
    }, { quoted: m });

  } catch (e) {
    console.error('[HanakoKun Error]', e);

    conn.reply(m.chat, `
✘ 「 𝑬𝑹𝑹𝑶𝑹 𝑬𝑵 𝑬𝑵𝑽𝑰́𝑶 」
➤ No se pudo enviar el video.
➤ Aquí tienes el enlace para verlo o descargarlo:
➤ ${e?.message?.includes('enlace') ? 'El video no existe o fue eliminado.' : 'Link directo:'}
${e?.message?.includes('http') ? e.message : (json?.[0]?.enlace || 'No disponible')}
`, m);
  }
};

handler.command = ['peliculamp4'];
handler.help = ['peliculamp4 <título>'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;
