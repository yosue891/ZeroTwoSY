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
      throw new Error('Película no encontrada o enlace inválido');
    }

    const movie = json[0];

    const caption = `
╭──〔 ✦ 𝑷𝑬𝑳𝑰́𝑪𝑼𝑳𝑨 𝑬𝑵𝑪𝑶𝑵𝑻𝑹𝑨𝑫𝑨 ✦ 〕──╮
┃🎬 *Título:* ${movie.nombre}
┃📅 *Año:* ${movie.año}
┃⭐ *Estrellas:* ${movie.estrellas}
┃🐞 *Formato Detectado:* ${movie.enlace.split('.').pop()}
╰──────────────────────────────╯
> Hecho con NightAPI 🌌
✦ 𝑯𝒂𝒏𝒂𝒌𝒐-𝒌𝒖𝒏 𝒕𝒆 𝒂𝒃𝒓𝒆 𝒍𝒂𝒔 𝒑𝒖𝒆𝒓𝒕𝒂𝒔 𝒅𝒆𝒍 𝒄𝒊𝒏𝒆...
`.trim();

    try {
      // Envío del video con mimetype forzado y fallback
      await conn.sendMessage(m.chat, {
        video: { url: movie.enlace },
        caption,
        mimetype: 'video/*' // puedes cambiarlo a video/* para más flexibilidad
      }, { quoted: m });
    } catch (error) {
      // En caso de error por tamaño o formato
      await conn.reply(m.chat, `
✘ 〔 ⚠️ 𝑬𝑹𝑹𝑶𝑹 𝑬𝑵 𝑬𝑵𝑽𝑰́𝑶 ⚠️ 〕
┊ El video es muy pesado o no se pudo enviar directamente.
┊ Puedes descargarlo manualmente desde este enlace:
┊ ${movie.enlace}
╰──────✦ 𝑯𝒂𝒏𝒂𝒌𝒐 𝒕𝒊𝒆𝒏𝒆 𝒔𝒖𝒔 𝒍𝒊́𝒎𝒊𝒕𝒆𝒔...`, m);
    }

  } catch (e) {
    console.error('[Hanako Error]', e);
    return conn.reply(m.chat, `
✘ 〔 ⚠️ 𝑷𝑬𝑳𝑰́𝑪𝑼𝑳𝑨 𝑵𝑶 𝑬𝑵𝑪𝑶𝑵𝑻𝑹𝑨𝑫𝑨 ⚠️ 〕
┊ No se pudo recuperar la película *${text}*.
┊ Asegúrate de que exista o esté disponible.
╰──────𖤐 𝑳𝒂 𝒄𝒊𝒏𝒆𝒎𝒂𝒈𝒊𝒂 𝒂𝒗𝒆𝒄𝒆𝒔 𝒇𝒂𝒍𝒍𝒂...`, m);
  }
};

handler.command = ['peliculamp4'];
handler.help = ['peliculamp4 <título>'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;
