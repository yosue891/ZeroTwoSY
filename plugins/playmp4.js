import fetch from 'node-fetch'

var handler = async (m, { args, conn }) => {
  if (!args[0]) return conn.reply(m.chat, '⚠️ Escribe un enlace de YouTube.\nEj: *playmp4 https://youtu.be/xxxx*', m)

  const url = args[0]
  const api = `https://nightapioficial.onrender.com/api/ytvideo?url=${encodeURIComponent(url)}&format=mp4&quality=720p`

  try {
    const res = await fetch(api)
    const json = await res.json()

    if (!json.video) return conn.reply(m.chat, '❌ No se encontró el video en la API.', m)

    await conn.sendMessage(m.chat, {
      video: { url: json.video },
      caption: `✅ *Video descargado:*\n${url}`
    }, { quoted: m })

  } catch (err) {
    console.error('[ERROR EN playmp4]', err)
    conn.reply(m.chat, '❌ Error al procesar el video. Puede que el link esté mal o la API no responde.', m)
  }
}

handler.command = ['playmp4']
handler.help = ['playmp4 <enlace>']
handler.tags = ['downloader']
handler.register = true

export default handler
