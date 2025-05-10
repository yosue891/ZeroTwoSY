let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
  let user = global.db.data.users[userId]
  let name = conn.getName(userId)
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  let totalreg = Object.keys(global.db.data.users).length
  let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length

  let txt = `
╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
│  👻 𝙼𝚊𝚢𝚌𝚘𝚕𝙰𝙸𝚄𝚕𝚝𝚛𝚊𝙼𝙳 👻  
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯

┊♡⃛◌°˚˖⋆࿔࿉༓ ༓࿉࿔⋆˖˚°◌⃛♡┊

🌸 ¡Konnichiwa, ${name}! Soy ${botname} ✿
👻 ¡Hola! Jeje ^^, Te aviso que te puedes registrar con #reg SoyMaycol.17

╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
│ 👤 Usuario » @${userId.split('@')[0]}
│ 🔮 Estado » ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'Réplica')}
│ ⏰ Activo » ${uptime}
│ 👥 Usuarios » ${totalreg}
│ 📜 Sellos » ${totalCommands}
│ 🔄 Sistema » Multi Device
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

🔍 Usa #code o #qr para tenerme jeje <3

┊♡⃛◌°˚˖⋆࿔࿉༓ ༓࿉࿔⋆˖˚°◌⃛♡┊

≫───── ⋆✩⋆ ─────≪
✦ ↓↓↓『 ⋆˚✿˖°SELLOS ESPIRITUALES˖°✿˚⋆ 』↓↓↓ ✦
≫───── ⋆✩⋆ ─────≪

┏━━━━━━━━━━━━━━━┓
┃     👻 𝙸𝙽𝙵𝙾-𝙱𝙾𝚃 👻     ┃
┃                         ┃
┃ ❈ #ayuda • #menu       ┃
┃ ❈ #tiempo • #actividad ┃
┃ ❈ #codigo • #script    ┃
┃ ❈ #equipo • #staff     ┃
┃ ❈ #yokai • #serbot     ┃
┃ ❈ #familiares • #bots  ┃
┃ ❈ #invocador           ┃
┃ ❈ #estado • #status    ┃
┃ ❈ #enlaces • #grupos   ┃
┃ ❈ #infobot             ┃
┃ ❈ #sugerir • #newsello ┃
┃ ❈ #p • #ping           ┃
┃ ❈ #reportar • #report  ┃
┃ ❈ #sistema • #system   ┃
┃ ❈ #velocidad • #speed  ┃
┃ ❈ #visitas • #usuarios ┃
┃ ❈ #sellos • #funciones ┃
┃ ❈ #limpiar • #fixmsg   ┃
┃ ❈ #editrespuesta       ┃
┗━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━┓
┃     🔍 BÚSQUEDAS 🔎     ┃
┃                         ┃
┃ ❈ #buscartiktok • #tts ┃
┃ ❈ #buscartweets        ┃
┃ ❈ #ytbuscar • #yts     ┃
┃ ❈ #github              ┃
┃ ❈ #pelicula • #cuevana ┃
┃ ❈ #google              ┃
┃ ❈ #pin • #pinterest    ┃
┃ ❈ #imagen • #image     ┃
┃ ❈ #infoanime           ┃
┃ ❈ #buscarhentai        ┃
┃ ❈ #xnxxbuscar • #xnxxs ┃
┃ ❈ #xvbuscar            ┃
┃ ❈ #phbuscar            ┃
┃ ❈ #npmjs               ┃
┗━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━┓
┃     📥 DESCARGAS 📥     ┃
┃                         ┃
┃ ❈ #tiktok • #tt        ┃
┃ ❈ #mediafire • #mf     ┃
┃ ❈ #pinvid • #pinvideo  ┃
┃ ❈ #mega • #mg          ┃
┃ ❈ #play • #play2       ┃
┃ ❈ #ytmp3 • #ytmp4      ┃
┃ ❈ #fb • #facebook      ┃
┃ ❈ #twitter • #x        ┃
┃ ❈ #ig • #instagram     ┃
┃ ❈ #tts • #tiktoks      ┃
┃ ❈ #terabox • #tb       ┃
┃ ❈ #ttimg • #ttmp3      ┃
┃ ❈ #gitclone            ┃
┃ ❈ #xvideosdl           ┃
┃ ❈ #xnxxdl              ┃
┃ ❈ #apk • #modapk       ┃
┃ ❈ #tiktokrandom        ┃
┃ ❈ #npmdl               ┃
┗━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━┓
┃    💰 ECONOMÍA 💰      ┃
┃                         ┃
┃ ❈ #w • #trabajar       ┃
┃ ❈ #slut • #prostituirse┃
┃ ❈ #cf • #suerte        ┃
┃ ❈ #crime • #crimen     ┃
┃ ❈ #ruleta • #roulette  ┃
┃ ❈ #casino • #apostar   ┃
┃ ❈ #slot                ┃
┃ ❈ #cartera • #wallet   ┃
┃ ❈ #banco • #bank       ┃
┃ ❈ #deposit • #depositar┃
┃ ❈ #with • #retirar     ┃
┃ ❈ #transfer • #pay     ┃
┃ ❈ #miming • #minar     ┃
┃ ❈ #buyall • #buy       ┃
┃ ❈ #daily • #diario     ┃
┃ ❈ #cofre               ┃
┃ ❈ #weekly • #semanal   ┃
┃ ❈ #monthly • #mensual  ┃
┃ ❈ #steal • #robar      ┃
┃ ❈ #robarxp • #robxp    ┃
┃ ❈ #eboard • #baltop    ┃
┃ ❈ #aventura • #adventure┃
┃ ❈ #curar • #heal       ┃
┃ ❈ #cazar • #hunt       ┃
┃ ❈ #inv • #inventario   ┃
┃ ❈ #mazmorra • #explorar┃
┃ ❈ #halloween           ┃
┃ ❈ #christmas • #navidad┃
┗━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━┓
┃    🎴 YOKAI GACHA 🎴    ┃
┃                         ┃
┃ ❈ #rollwaifu • #rw     ┃
┃ ❈ #claim • #reclamar   ┃
┃ ❈ #harem • #waifus     ┃
┃ ❈ #charimage • #wimage ┃
┃ ❈ #charinfo • #winfo   ┃
┃ ❈ #givechar • #regalar ┃
┃ ❈ #vote • #votar       ┃
┃ ❈ #waifusboard • #topyokais┃
┗━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━┓
┃    🔖 STICKERS 🔖      ┃
┃                         ┃
┃ ❈ #sticker • #s        ┃
┃ ❈ #setmeta             ┃
┃ ❈ #delmeta             ┃
┃ ❈ #pfp • #getpic       ┃
┃ ❈ #qc                  ┃
┃ ❈ #toimg • #img        ┃
┃ ❈ #brat • #ttp • #attp ┃
┃ ❈ #emojimix            ┃
┃ ❈ #wm                  ┃
┗━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━┓
┃    🛠️ HERRAMIENTAS 🛠️   ┃
┃                         ┃
┃ ❈ #calcular • #cal     ┃
┃ ❈ #tiempo • #clima     ┃
┃ ❈ #horario             ┃
┃ ❈ #fake • #fakereply   ┃
┃ ❈ #enhance • #remini   ┃
┃ ❈ #letra               ┃
┃ ❈ #read • #ver         ┃
┃ ❈ #whatmusic • #shazam ┃
┃ ❈ #ss • #ssweb         ┃
┃ ❈ #length • #tamaño    ┃
┃ ❈ #say • #decir        ┃
┃ ❈ #todoc • #toducument ┃
┃ ❈ #translate • #traducir┃
┃ ❈ #githubstalk         ┃
┃ ❈ #maycode             ┃
┗━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━┓
┃      👤 PERFIL 👤       ┃
┃                         ┃
┃ ❈ #reg • #verificar    ┃
┃ ❈ #unreg               ┃
┃ ❈ #profile             ┃
┃ ❈ #marry               ┃
┃ ❈ #divorce             ┃
┃ ❈ #setgenre • #setgenero┃
┃ ❈ #delgenre • #delgenero┃
┃ ❈ #setbirth • #setnacimiento┃
┃ ❈ #delbirth • #delnacimiento┃
┃ ❈ #setdescription • #setdesc┃
┃ ❈ #deldescription • #deldesc┃
┃ ❈ #lb • #lboard        ┃
┃ ❈ #level • #lvl        ┃
┃ ❈ #comprarpremium • #premium┃
┃ ❈ #confesiones • #confesar┃
┗━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━┓
┃      👥 GRUPOS 👥       ┃
┃                         ┃
┃ ❈ #hidetag             ┃
┃ ❈ #gp • #infogrupo     ┃
┃ ❈ #linea • #listonline ┃
┃ ❈ #setwelcome          ┃
┃ ❈ #setbye              ┃
┃ ❈ #link                ┃
┃ ❈ #admins • #admin     ┃
┃ ❈ #restablecer • #revoke┃
┃ ❈ #grupo [abrir/cerrar]┃
┃ ❈ #kick                ┃
┃ ❈ #add • #añadir       ┃
┃ ❈ #promote             ┃
┃ ❈ #demote              ┃
┃ ❈ #gpbanner • #groupimg┃
┃ ❈ #gpname • #groupname ┃
┃ ❈ #gpdesc • #groupdesc ┃
┃ ❈ #advertir • #warn    ┃
┃ ❈ #unwarn • #delwarn   ┃
┃ ❈ #advlist • #listadv  ┃
┃ ❈ #bot [on/off]        ┃
┃ ❈ #mute                ┃
┃ ❈ #unmute              ┃
┃ ❈ #encuesta • #poll    ┃
┃ ❈ #delete • #del       ┃
┃ ❈ #fantasmas           ┃
┃ ❈ #kickfantasmas       ┃
┃ ❈ #invocar • #tagall   ┃
┃ ❈ #setemoji • #setemo  ┃
┃ ❈ #listnum • #kicknum  ┃
┗━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━┓
┃      👘 ANIME 👘       ┃
┃                         ┃
┃ ❈ #angry • #enojado    ┃
┃ ❈ #bite                ┃
┃ ❈ #bleh                ┃
┃ ❈ #blush               ┃
┃ ❈ #bored • #aburrido   ┃
┃ ❈ #cry                 ┃
┃ ❈ #cuddle              ┃
┃ ❈ #dance               ┃
┃ ❈ #drunk               ┃
┃ ❈ #eat • #comer        ┃
┃ ❈ #facepalm            ┃
┃ ❈ #happy • #feliz      ┃
┃ ❈ #hug                 ┃
┃ ❈ #impregnate • #preg  ┃
┃ ❈ #kill                ┃
┃ ❈ #kiss • #besar       ┃
┃ ❈ #laugh               ┃
┃ ❈ #lick                ┃
┃ ❈ #love • #amor        ┃
┃ ❈ #pat                 ┃
┃ ❈ #poke                ┃
┃ ❈ #pout                ┃
┃ ❈ #punch               ┃
┃ ❈ #run                 ┃
┃ ❈ #sad • #triste      ┃
┃ ❈ #scared              ┃
┃ ❈ #seduce              ┃
┃ ❈ #shy • #timido       ┃
┃ ❈ #slap                ┃
┃ ❈ #dias • #days        ┃
┃ ❈ #noches • #nights    ┃
┃ ❈ #sleep               ┃
┃ ❈ #smoke               ┃
┃ ❈ #think               ┃
┗━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━┓
┃      🔞 NSFW 🔞        ┃
┃                         ┃
┃ ❈ #anal                ┃
┃ ❈ #waifu               ┃
┃ ❈ #bath                ┃
┃ ❈ #blowjob • #mamada   ┃
┃ ❈ #boobjob             ┃
┃ ❈ #cum                 ┃
┃ ❈ #fap                 ┃
┃ ❈ #ppcouple • #ppcp    ┃
┃ ❈ #footjob             ┃
┃ ❈ #fuck • #coger       ┃
┃ ❈ #cafe • #coffe       ┃
┃ ❈ #violar • #perra     ┃
┃ ❈ #grabboobs           ┃
┃ ❈ #grop                ┃
┃ ❈ #lickpussy           ┃
┃ ❈ #rule34 • #r34       ┃
┃ ❈ #sixnine • #69       ┃
┃ ❈ #spank • #nalgada    ┃
┃ ❈ #suckboobs           ┃
┃ ❈ #undress • #encuerar ┃
┃ ❈ #yuri • #tijeras     ┃
┗━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━┓
┃      🎮 JUEGOS 🎮       ┃
┃                         ┃
┃ ❈ #amistad             ┃
┃ ❈ #chaqueta • #jalamela┃
┃ ❈ #chiste              ┃
┃ ❈ #consejo             ┃
┃ ❈ #doxeo • #doxear     ┃
┃ ❈ #facto               ┃
┃ ❈ #formarpareja        ┃
┃ ❈ #formarpareja5       ┃
┃ ❈ #frase               ┃
┃ ❈ #huevo               ┃
┃ ❈ #chupalo             ┃
┃ ❈ #aplauso             ┃
┃ ❈ #marron              ┃
┃ ❈ #suicidar            ┃
┃ ❈ #iq • #iqtest        ┃
┃ ❈ #meme                ┃
┃ ❈ #morse               ┃
┃ ❈ #nombreninja         ┃
┃ ❈ #paja • #pajeame     ┃
┃ ❈ #personalidad        ┃
┃ ❈ #piropo              ┃
┃ ❈ #pregunta            ┃
┃ ❈ #ship • #pareja      ┃
┃ ❈ #sorteo              ┃
┃ ❈ #top                 ┃
┃ ❈ #formartrio          ┃
┃ ❈ #ahorcado            ┃
┃ ❈ #mates • #matematicas┃
┃ ❈ #ppt                 ┃
┃ ❈ #sopa • #buscarpalabra┃
┃ ❈ #pvp • #suit         ┃
┃ ❈ #ttt                 ┃
┃ ❈ #secreto             ┃
┗━━━━━━━━━━━━━━━┛

┊♡⃛◌°˚˖⋆࿔࿉༓ ༓࿉࿔⋆˖˚°◌⃛♡┊

"Te concederé un deseo... ¿qué es lo que buscas?"
`.trim()

  await conn.sendMessage(m.chat, {
    text: txt,
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
      },
  }, { quoted: m })

}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']

export default handler

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60)
    let minutes = Math.floor((ms / (1000 * 60)) % 60)
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    return `${hours}h ${minutes}m ${seconds}s`
      }
