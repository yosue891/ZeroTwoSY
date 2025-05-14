import fetch from 'node-fetch';

const handler = async (m, { text, conn }) => {
  if (!text) {
    return conn.reply(m.chat, `
✘ 〔 ⚠️ 𝑻𝑰́𝑻𝑼𝑳𝑶 𝑭𝑨𝑳𝑻𝑨𝑵𝑻𝑬 ⚠️ 〕
┊ Usa: *peliculamp4 <título>*
┊ Ej: *peliculamp4 Nosferatu*
╰──────𖤐 𝑯𝒂𝒏𝒂𝒌𝒐 𝒆𝒔𝒕𝒂́ 𝒆𝒔𝒄𝒖𝒄𝒉𝒂𝒏𝒅𝒐...`, m);
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
      throw new Error('Película no encontrada o enlace no válido');
    }

    const movie = json[0];

    const caption = `
╭─〔 ✦ 𝑷𝑬𝑳𝑰́𝑪𝑼𝑳𝑨 𝑬𝑵𝑪𝑶𝑵𝑻𝑹𝑨𝑫𝑨 ✦ 〕─╮
┃🎬 𝑻𝒊́𝒕𝒖𝒍𝒐: ${movie.nombre}
┃📅 𝑨𝒏̃𝒐: ${movie.año}
┃⭐ 𝑬𝒔𝒕𝒓𝒆𝒍𝒍𝒂𝒔: ${movie.estrellas}
┃🖼️ 𝑰𝒎𝒂𝒈𝒆𝒏: ${movie.imagen}
╰─────────────────────────────╯
✦ 𝑯𝒂𝒏𝒂𝒌𝒐-𝒌𝒖𝒏 𝒕𝒆 𝒓𝒆𝒈𝒂𝒍𝒂 𝒆𝒔𝒕𝒂 𝒋𝒐𝒚𝒂 𝒄𝒊𝒏𝒆𝒇𝒊𝒍𝒂...
`.trim();

    await conn.sendMessage(m.chat, {
      video: { url: movie.enlace },
      caption,
      mimetype: 'video/*'
    }, { quoted: m });

  } catch (e) {
    console.error('[Hanako Error]', e);
    return conn.reply(m.chat, `
✘ 〔 ⚠️ 𝑯𝑨𝑵𝑨𝑲𝑶 𝑺𝑬 𝑬𝑵𝑪𝑶𝑵𝑻𝑹𝑶́ 𝑪𝑶𝑵 𝑼𝑵 𝑬𝑹𝑹𝑶𝑹 ⚠️ 〕
┊ No se pudo recuperar la película *${text}*
┊ Asegúrate que el título esté correcto o que el enlace no esté roto.
╰──────𖤐 𝑳𝒂 𝒑𝒆𝒍𝒊́𝒄𝒖𝒍𝒂 𝒒𝒖𝒊𝒛𝒂́ 𝒂𝒖́𝒏 𝒆𝒔𝒕𝒆́ 𝒆𝒔𝒑𝒆𝒓𝒂𝒏𝒅𝒐 𝒓𝒆𝒏𝒂𝒄𝒆𝒓...`, m);
  }
};

handler.command = ['peliculamp4'];
handler.help = ['peliculamp4 <título>'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;
