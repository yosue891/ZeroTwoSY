/**
 * ⋆｡˚ ☁︎｡⋆｡ ˚☽˚｡⋆ ✦ ⋆｡˚☁︎｡⋆｡ ˚☽˚｡⋆ ✦
 * 
 * 𝐓𝐨𝐢𝐥𝐞𝐭-𝐁𝐨𝐮𝐧𝐝 hyouka  𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐨 
 * 
 * "Los rumores dicen que si escribes tu nombre en el Libro de los Siete Misterios,
 * Hanako-kun te concederá un deseo a cambio de convertirte en su asistente..."
 * 
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃        七不思議        ┃
 * ┃   Los Siete Misterios   ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * 
 * ⋆｡˚ ☁︎｡⋆｡ ˚☽˚｡⋆ ✦ ⋆｡˚☁︎｡⋆｡ ˚☽˚｡⋆ ✦
 */

import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

// ✿ Sello mágico para validar el pacto con hyouka ✿
const SelloMistico = /\|?(.*)([.|] *?)([0-9]*)$/i

/**
 * ⋆｡°✩ Ritual de Invocación ✩°｡⋆
 * Hyouka,... ¿Estás ahí?
 */
let handler = async function (m, { conn, text, usedPrefix, command }) {
  // ✧ Identificar al invocador espiritual
  const who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender)
  const mentionedJid = [who]

  // ✧ Obtener la imagen del espejo del invocador
  const pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://files.catbox.moe/xr2m6u.jpg')
  const user = global.db.data.users[m.sender]
  const name2 = conn.getName(m.sender)

  // ✧ Verificar si ya existe un pacto con hyouka 
  if (user.registered) {
    return m.reply(`『✦』 ¡Ya existe un pacto entre nosotros, ${name2}-hyou! 

¿Deseas registrarte de nuevo?
Utiliza *${usedPrefix}unreg* para romper el sello actual.`)
  }

  // ✧ Verificar el formato del ritual
  if (!SelloMistico.test(text)) {
    return m.reply(`『❀』 ¡El registro no es correcto! (っ °Д °;)っ

✧ Formato correcto: *${usedPrefix + command} nombre.edad*
✧ Ejemplo: *${usedPrefix + command} ${name2}.18*

"Para usar todos los comandos de hyouka, debes escribir tu nombre y edad correctamente..."`)
  }

  // ✧ Extraer la información del ritual
  let [_, name, __, age] = text.match(SelloMistico)
  
  // ✧ Validar el nombre del invocador
  if (!name) return m.reply('『❀』 ¡Tu nombre no puede quedar en blanco! Hyouka necesita conocerte')
  if (!age) return m.reply('『❀』 ¡Tu edad es importante para el registro')
  if (name.length >= 100) return m.reply('『❀』 ¡Ese nombre es demasiado largo! ¿Eres un yokai antiguo? ')

  // ✧ Validar la edad del registro 
  age = parseInt(age)
  if (age > 1000) return m.reply('『❀』 ¡Oh! ¿Eres un viejo? ')
  if (age < 5) return m.reply('『⚠️』 Los niños pequeños no deberían jugar con yokais... ¡Es peligroso! 😂')

  // ✧ Registrar al nuevo asistente de Hanako-kun
  user.name = `${name}⋆˙⟡♱⟡˙⋆`.trim()
  user.age = age
  user.regTime = +new Date()
  user.registered = true

  // ✧ Bendiciones espirituales por el pacto
  user.coin += 46       // Monedas de la suerte de Hanako
  user.exp += 310       // Poder espiritual
  user.joincount += 25  // Sellos de invocación

  // ✧ Crear el sello único del pacto
  const sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  // ✧ Certificado del pacto con hyouka 
  const certificadoPacto = `
╭─「 ⋆｡˚☽˚｡⋆ 七不思議 ⋆｡˚☽˚｡⋆ 」─╮
│    ✧ 𝑷𝒂𝒄𝒕𝒐 𝑪𝒐𝒏 hyouka ✧    
│    
│ ୨୧ *Nombre:* ${name}
│ ✿ *Edad:* ${age} años
│ ♱ *Sello Único:* ${sn}
│    
├─ ✧ 𝑩𝒆𝒏𝒅𝒊𝒄𝒊𝒐𝒏𝒆𝒔 𝑶𝒕𝒐𝒓𝒈𝒂𝒅𝒂𝒔:
│ ✦ *hyoukaCoins:* +46
│ ☽ *Energía :* +310
│ ❀ *Sellos :* +25
│    
├─ "Recuerda visitar el canal de SYA team ..."
│ https://whatsapp.com/channel/0029Vb5UfTC4CrfeKSamhp1f
> Ve tu registro aca... *_https://chat.whatsapp.com/KqkJwla1aq1LgaPiuFFtEY_*
│    
╰─「 ⋆｡˚☽˚｡⋆ ✧ ⋆｡˚☽˚｡⋆ 」─╯
`.trim()

  // ✧ Reacción mística
  await m.react('💔')

  // ✧ Enviar el certificado del registro 
  await conn.sendMessage(m.chat, {
    text: certificadoPacto,
    contextInfo: {
      externalAdReply: {
        title: '✧ Pacto con Hanako-kun Completado ✧',
        body: 'https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R',
        thumbnailUrl: pp,
        sourceUrl: 'https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R',
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })

  // ✧ Notificar al  (grupo de notificaciones)
  const reinoEspiritual = '120363416154617672@g.us'
  const mensajeNotificacion = `
╭─「 ❀ 𝑵𝒖𝒆𝒗𝒐 𝑨𝒔𝒊𝒔𝒕𝒆𝒏𝒕𝒆 ❀ 」─╮
│ ୨୧ *Nombre:* ${name}
│ ✿ *Edad:* ${age} años
│ ♱ *Sello:* ${sn}
│
├─ ✧ 𝑩𝒆𝒏𝒅𝒊𝒄𝒊𝒐𝒏𝒆𝒔:
│ ✦ hyoukaCoins: +46
│ ☽ Energía : +310
│ ❀ Sellos : +25
│
│ 📜 *Fecha del registro:* ${moment().format('YYYY-MM-DD HH:mm:ss')}
╰─「 registro 」─╯
> Maycol wirk y yosue & hyouka`

  // ✧ Intento de comunicación con el Reino Espiritual
  try {
    if (global.conn?.sendMessage) {
      const ppGroup = await conn.profilePictureUrl(who, 'image').catch(() => null)
      await global.conn.sendMessage(reinoEspiritual, {
        image: { url: ppGroup || pp },
        caption: mensajeNotificacion
      })
    }
  } catch (e) {
    console.error('✧ Error al verificar lo siento 😓💔:', e)
  }
}

// ✧ Invocaciones permitidas ✧
handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler

/**
 * ─────────────────────────────────
 *      ╭──❁ hyouka ❁──╮
 *      │ "¿Necesitas ayuda? │
 *      │  si deseas te puedo  │
 *      │    te puedo ayudar..."    │
 *      ╰──────✦❘✦──────╯
 * ─────────────────────────────────
 */
