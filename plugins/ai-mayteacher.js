import fetch from 'node-fetch'

var handler = async (m, { text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `Ingrese una petición para que MayTeacher lo responda.`, m)
  }
  try {
    await m.react('⏳')
    conn.sendPresenceUpdate('composing', m.chat)

    let prompt = `Eres una IA llamada MayTeacher, fuiste creada por Maycol y debes tratar a las personas con mucho cariño. Fuiste creada para ayudar a las personas en las tareas. Una persona de otro mundo (yo no soy) te dijo esto: ${text}`

    let apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(prompt)}`)
    let res = await apii.json()

    await m.reply(res.result)
  } catch {
    await m.react('❌')
    await conn.reply(m.chat, `MayTeacher no puede responder a esa pregunta.`, m)
  }
}

handler.command = ['mayteacher']
handler.help = ['mayteacher']
handler.tags = ['ai']

export default handler
