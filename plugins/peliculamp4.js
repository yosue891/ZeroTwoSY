import fetch from 'node-fetch';

const handler = async (m, { text, conn, args }) => {
  if (!text) {
    return conn.reply(m.chat, `
✘ 〔 ⚠️ 𝑻𝑰́𝑻𝑼𝑳𝑶 𝑭𝑨𝑳𝑻𝑨𝑵𝑻𝑬 ⚠️ 〕
┊ Usa: *peliculamp4 <título>*
┊ Ej: *peliculamp4 Nosferatu*
╰──────𖤐 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 𝒆𝒔𝒕𝒂́ 𝒂𝒏𝒐𝒕𝒂𝒏𝒅𝒐...`, m);
  }

  const apiUrl = `https://nightapioficial.onrender.com/api/movies/info?title=${encodeURIComponent(text)}`;

  await conn.reply(m.chat, `
╭──〔 ✦ 𝑯𝑨𝑵𝑨𝑲𝑶-𝑲𝑼𝑵 𝑬𝑺𝑻𝑨́ 𝑬𝑿𝑷𝑳𝑶𝑹𝑨𝑵𝑫𝑶... ✦ 〕──╮
┃⌛ Buscando entre los archivos malditos de Archive.org...
┃✨ Encontrando la esencia de *${text}*...
╰──────────────────────────────╯`, m);

  try {
    const res = await fetch(apiUrl);
    const json = await res.json();
    if (!json || !json[0] || !json[0].enlace) throw new Error('No se encontró la película');

    const movie = json[0];
    const caption = `
╭─〔 𝑯𝑨𝑵𝑨𝑲𝑶 𝑲𝑼𝑵 ✦ 𝑬𝑵𝑻𝑹𝑬𝑮𝑨 𝑪𝑰𝑵𝑬 〕─╮
┃🎬 𝑻𝒊́𝒕𝒖𝒍𝒐: ${movie.nombre}
┃📅 𝑨𝒏̃𝒐: ${movie.año}
┃⭐ 𝑬𝒔𝒕𝒓𝒆𝒍𝒍𝒂𝒔: ${movie.estrellas}
┃🪞 𝑰𝒎𝒂𝒈𝒆𝒏: ${movie.imagen}
╰──────────────────────────────╯
> NightAPI 🌌
✨ 𝑬𝒔𝒕𝒂 𝒑𝒆𝒍𝒊́𝒄𝒖𝒍𝒂 𝒉𝒂 𝒔𝒊𝒅𝒐 𝒓𝒆𝒔𝒄𝒂𝒕𝒂𝒅𝒂 𝒅𝒆𝒔𝒅𝒆 𝒍𝒂 𝒃𝒊𝒃𝒍𝒊𝒐𝒕𝒆𝒄𝒂 𝒄𝒐𝒏 𝒂𝒎𝒐𝒓 𝒑𝒐𝒓 𝑯𝒂𝒏𝒂𝒌𝒐.
`.trim();

    await conn.sendMessage(m.chat, {
      video: { url: movie.enlace },
      caption,
      mimetype: 'video/*'
    }, { quoted: m });

  } catch (e) {
    console.error('[Hanako Error]', e);
    return conn.reply(m.chat, `
✘ 〔 ⚠️ 𝑯𝑨𝑵𝑨𝑲𝑶 𝑺𝑬 𝑬𝑵𝑪𝑶𝑵𝑻𝑹𝑶́ 𝑪𝑶𝑵 𝑼𝑵 𝑭𝑨𝑵𝑻𝑨𝑺𝑴𝑨 ⚠️ 〕
┊ No se pudo recuperar la película "${text}"
┊ Asegúrate de que el título exista y sea correcto.
╰──────𖤐 𝑬𝒍 𝒆𝒓𝒓𝒐𝒓 𝒇𝒖𝒆 𝒅𝒊𝒈𝒆𝒓𝒊𝒅𝒐 𝒑𝒐𝒓 𝒍𝒂 𝒄𝒂𝒑𝒂 𝒅𝒆 𝒍𝒐𝒔 𝒆𝒔𝒑𝒆𝒋𝒐𝒔...`, m);
  }
};

handler.command = ['peliculamp4'];
handler.help = ['peliculamp4 <título>'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;
