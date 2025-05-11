import fetch from 'node-fetch'
import moment from 'moment-timezone'

const canalId = '120363372883715167@newsletter'

export async function before(m, { conn, participants }) {
  if (!m.messageStubType || !m.isGroup) return

  const jid = m.messageStubParameters?.[0]
  let bufferImagen = null

  // Intentar obtener imagen solo si hay jid válido
  if (jid) {
    try {
      const ppUrl = await conn.profilePictureUrl(jid, 'image')
      if (ppUrl) {
        const res = await fetch(ppUrl)
        if (res.ok) bufferImagen = await res.buffer()
      }
    } catch (e) {
      console.log('No se pudo obtener la foto de perfil:', e)
    }
  }

  const hora = moment().format('YYYY-MM-DD HH:mm:ss')

  let texto = ''
  if (m.messageStubType === 27) {
    texto = `
╭─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╮
│  ❀ *Bienvenido* al grupo de espíritus...
│  ✦ *Hora:* ${hora}
│  ✦ *Mensaje:* ¡Ahora eres parte de nuestro mundo!
╰─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 」─╯
> Hecho por SoyMaycol`.trim()
  } else if (m.messageStubType === 28 || m.messageStubType === 32) {
    texto = `
╭─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╮
│  ❀ *Adiós* a nuestro espíritu...
│  ✦ *Hora:* ${hora}
│  ✦ *Razón:* Alguien dejó el grupo...
│  🗨️ *Comentario:* Qué mal :c
╰─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 」─╯
> Hecho por SoyMaycol`.trim()
  } else return

  // Enviar mensaje al grupo
  await conn.sendMessage(m.chat, { text: texto }, { quoted: m })

  // Enviar mensaje al canal
  try {
    if (bufferImagen) {
      await conn.sendMessage(canalId, {
        image: bufferImagen,
        caption: texto
      })
    } else {
      await conn.sendMessage(canalId, { text: texto })
    }
  } catch (e) {
    console.error('Error al enviar al canal:', e)
  }
}
