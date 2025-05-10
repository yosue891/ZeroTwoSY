import fetch from 'node-fetch'
import { writeFileSync, unlinkSync } from 'fs'
import path from 'path'

const handler = async (m, { args, conn }) => {
  if (!args[0]) return conn.reply(m.chat, '⚠️ *Escribe un enlace de YouTube.*\nEj: *playmp4 https://youtu.be/xxxx*', m)

  const url = args[0]
  const api = `https://nightapioficial.onrender.com/api/ytvideo?url=${encodeURIComponent(url)}&format=mp4&quality=720p`

  await conn.reply(m.chat, `⏳ *Hanako-kun está invocando el video... espera un poco, humano.*`, m)

  try {
    const res = await fetch(api)
    if (!res.ok || !res.headers.get('content-type')?.includes('video')) {
      throw new Error('Respuesta no válida o no es un video')
    }

    const buffer = await res.buffer()
    const filename = `hanako-video-${Date.now()}.mp4`
    const filepath = path.join('./temp', filename)

    writeFileSync(filepath, buffer)

    await conn.sendMessage(m.chat, {
      video: { url: filepath },
      caption: `✨ *Aquí tienes tu video humano~*\n🎬 *Invocado por Hanako-kun desde el inframundo.*\n🔗 ${url}`
    }, { quoted: m })

    unlinkSync(filepath) // borrar el archivo luego de enviarlo
  } catch (err) {
    console.error('[ERROR en playmp4]', err)
    conn.reply(m.chat, `❌ *Error fatal: Hanako-kun no pudo traer tu video.*\nVerifica que el enlace sea correcto o intenta más tarde.`, m)
  }
}

handler.command = ['playmp4']
handler.help = ['playmp4 <enlace>']
handler.tags = ['downloader']
handler.register = true

export default handler
