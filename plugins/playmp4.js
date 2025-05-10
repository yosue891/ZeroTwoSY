import fetch from 'node-fetch'

var handler = async (m, { args, conn }) => {
  if (!args[0]) return conn.reply(m.chat, '⚠️ *Escribe un enlace de YouTube.*\nEj: *playmp4 https://youtu.be/xxxx*', m)

  const url = args[0]
  const api = `https://nightapioficial.onrender.com/api/ytvideo?url=${encodeURIComponent(url)}&format=mp4&quality=720p`

  // Enviamos un mensaje diciendo que se está descargando el video.
  await conn.reply(m.chat, `🔄 *Descargando el video... por favor espere un momento.*\n*Hanako-kun está trabajando en esto...*`, m)

  try {
    const res = await fetch(api)
    const json = await res.json()

    // Comprobamos si la API devuelve el enlace del video
    if (!json.video) {
      return conn.reply(m.chat, `❌ *Error:* No se pudo encontrar el video en la API. Asegúrate de que el enlace es válido y no tiene restricciones.`, m)
    }

    // Si la API devuelve el enlace, lo enviamos
    await conn.sendMessage(m.chat, {
      video: { url: json.video },
      caption: `✨ *¡Aquí tienes el video!*\n\n🎥 *Video descargado exitosamente.*\n🔗 *Enlace original:* ${url}`
    }, { quoted: m })

  } catch (err) {
    console.error('[ERROR EN playmp4]', err)
    conn.reply(m.chat, `❌ *Error al procesar el video.* Puede que el link esté mal o la API no responde en este momento.\n*Hanako-kun no pudo encontrar la respuesta...*`, m)
  }
}

handler.command = ['playmp4']
handler.help = ['playmp4 <enlace>']
handler.tags = ['downloader']
handler.register = true

export default handler
