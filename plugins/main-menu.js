let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid?.[0] || m.sender
  let user = global.db.data.users[userId]
  let name = conn.getName(userId)
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  let totalreg = Object.keys(global.db.data.users).length

  // Saludo por hora
  let hour = new Date().getHours()
  let saludo = hour < 6 ? "🌌 Buenas madrugadas..." :
               hour < 12 ? "🌅 Buenos días" :
               hour < 18 ? "🌄 Buenas tardes" :
               "🌃 Buenas noches"

  // Agrupar comandos por categorías (tags)
  let categories = {}
  for (let plugin of Object.values(global.plugins)) {
    if (!plugin.help || !plugin.tags) continue
    for (let tag of plugin.tags) {
      if (!categories[tag]) categories[tag] = []
      categories[tag].push(...plugin.help.map(cmd => `#${cmd}`))
    }
  }

  // MENÚ DECORATIVO HANAKO-KUN STYLE
  let menuText = `
╭───────⊹⊱✫⊰⊹───────╮

    ✧ ${name} ✧  
  Ven a ver estos Hechizos
  
╰───────⊹⊱✫⊰⊹───────╯

✎ 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝙲𝙸𝙾𝙽 ✎

💻 Sistema: Multi-Device
👤 Espíritu: @${userId.split('@')[0]}
⏰ Tiempo: ${uptime}
👥 Espíritus: ${totalreg} Espíritus

> *_${saludo}_* Jeje <3
 
ℍ𝕒𝕫𝕥𝕖 ℍ𝕒𝕟𝕒𝕜𝕠𝔹𝕠𝕥 𝕔𝕠𝕟 #𝕔𝕠𝕕𝕖 𝕠 #𝕢𝕣 𝕛𝕖𝕛𝕖 <𝟛
≪──── ⋆𓆩✧𓆪⋆ ────≫
`.trim()

  for (let [tag, cmds] of Object.entries(categories)) {
    let tagName = tag.toUpperCase().replace(/_/g, ' ')
    menuText += `

╭─━━━✦ ${tagName} ✦━━━─╮
${cmds.map(cmd => `│ ✧ ${cmd}`).join('\n')}
╰─━━━━━⊹⊱✫⊰⊹━━━━━─╯`
  }

  // Mensaje previo
  await conn.reply(m.chat, '♡ 𝔼𝕤𝕡𝕖𝕣𝕒𝕞𝕖 𝕥𝕒𝕟𝕥𝕚𝕥𝕠 𝕛𝕖𝕛𝕖 <𝟛 ♡', m, {
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
    video: { url: 'https://files.catbox.moe/i74z9e.mp4', gifPlayback: true },
    caption: menuText,
    gifPlayback: true,
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
