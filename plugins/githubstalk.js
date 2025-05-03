import axios from 'axios'
var handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, '*⚠️ INGRESE EL NOMBRE DE UN USUARIO DE GITHUB*', m)
  try {
    await mensajesEditados(conn, m)
    let request = await githubstalk(text)
    let { username, following, followers, type, bio, company, blog, location, email, public_repo, public_gists, profile_pic } = request

    let gata = `*⬤── 「 𝙂𝙄𝙏𝙃𝙐𝘽 𝙎𝙏𝘼𝙇𝙆 」 ──⬤*
➸ *Usuario:* ${username}
➸ *Biografía:* ${bio || 'No disponible'}
➸ *Compañía:* ${company || 'No disponible'}
➸ *Correo electrónico:* ${email || 'No disponible'}
➸ *Repositorios públicos:* ${public_repo}
➸ *Gists públicos:* ${public_gists}
➸ *Seguidores:* ${followers}
➸ *Siguiendo:* ${following}
➸ *Blog:* ${blog || 'No disponible'}
➸ *Ubicación:* ${location || 'No disponible'}
➸ *Tipo de cuenta:* ${type}`

    await conn.sendFile(m.chat, profile_pic, 'githubstalk.jpg', gata, m)
  } catch (e) {
    await conn.sendMessage(m.chat, { text: `Error al obtener datos del usuario. Asegúrate de que el nombre es correcto.\n\nUsa: ${usedPrefix + command} <usuario>`, edit: key })
    console.log(e)
  }
}

handler.help = ['githubstalk']
handler.tags = ['tools']
handler.command = ['githubstalk', 'github']
handler.group = false
handler.register = true
export default handler

async function githubstalk(user) {
  try {
    const { data } = await axios.get(`https://api.github.com/users/${user}`)
    return {
      username: data.login,
      nickname: data.name,
      bio: data.bio,
      id: data.id,
      nodeId: data.node_id,
      profile_pic: data.avatar_url,
      url: data.html_url,
      type: data.type,
      admin: data.site_admin,
      company: data.company,
      blog: data.blog,
      location: data.location,
      email: data.email,
      public_repo: data.public_repos,
      public_gists: data.public_gists,
      followers: data.followers,
      following: data.following,
      ceated_at: data.created_at,
      updated_at: data.updated_at
    }
  } catch (err) {
    throw err
  }
}
