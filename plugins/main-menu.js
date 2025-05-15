let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid?.[0] || m.sender
  let user = global.db.data.users[userId]
  let name = conn.getName(userId)
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  let totalreg = Object.keys(global.db.data.users).length

  // Agrupar comandos por categorías (tags)
  let categories = {}
  for (let plugin of Object.values(global.plugins)) {
    if (!plugin.help || !plugin.tags) continue
    for (let tag of plugin.tags) {
      if (!categories[tag]) categories[tag] = []
      categories[tag].push(...plugin.help.map(cmd => `${global.prefix[0]}${cmd}`))
    }
  }

  // Formatear el menú
  let menuText = `
╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
│  👻 𝙼𝚊𝚢𝚌𝚘𝚕𝙰𝙸𝚄𝚕𝚝𝚛𝚊𝙼𝙳 👻
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯

🌸 ¡Konnichiwa, ${name}! Soy ${botname}
👤 Usuario » @${userId.split('@')[0]}
⏰ Activo » ${uptime}
👥 Usuarios » ${totalreg}
🔄 Sistema » Multi Device

≫───── ⋆✩⋆ ─────≪
✦ 『 SELLOS ESPIRITUALES 』✦
≫───── ⋆✩⋆ ─────≪
`.trim()

  for (let [tag, cmds] of Object.entries(categories)) {
    let tagName = tag.toUpperCase().replace(/_/g, ' ')
    menuText += `

┏━【 ${tagName} 】━┓
${cmds.map(cmd => `┃ ❈ ${cmd}`).join('\n')}
┗━━━━━━━━━━━━━━┛`
  }

  // Mensaje previo
  await conn.reply(m.chat, '¡𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐦𝐢 𝐦𝐞𝐧𝐮! <3', m, {
    contextInfo: {
      externalAdReply: {
        title: botname,
        body: "Un amor que nunca se acaba Jeje <3",
        thumbnailUrl: 'https://files.catbox.moe/x9hw62.png',
        sourceUrl: redes,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      }
    }
  })

  // Envío del menú con video
  await conn.sendMessage(m.chat, {
    video: { url: 'https://files.catbox.moe/i74z9e.mp4' },
    caption: menuText,
    contextInfo: {
      mentionedJid: [m.sender, userId],
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363372883715167@newsletter',
        newsletterName: 'SoyMaycol <3',
        serverMessageId: -1,
      },
      forwardingScore: 999,
      externalAdReply: {
        title: botname,
        body: "Un amor que nunca se acaba Jeje <3",
        thumbnailUrl: banner,
        sourceUrl: redes,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      },
    }
  }, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
        }
