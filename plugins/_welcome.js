import fetch from 'node-fetch'
import moment from 'moment-timezone'

const canalId = '120363372883715167@newsletter'  // Canal donde enviar el mensaje

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return !0;

    const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}

    let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/3mdw9o.jpeg')
    let img = await (await fetch(`${pp}`)).buffer()

    let groupSize = participants.length
    if (m.messageStubType == 27) {
        groupSize++;
    } else if (m.messageStubType == 28 || m.messageStubType == 32) {
        groupSize--;
    }

    if (m.messageStubType == 28 || m.messageStubType == 32) {
        // Mensaje de despedida con la temática de Hanako-kun
        const mensajeAdios = `
╭─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╮
│  
│  ❀ *Adiós* a nuestro espíritu...  
│  ✦ *Hora:* ${moment().format('YYYY-MM-DD HH:mm:ss')}
│  ✦ *Razón:* Alguien dejó el grupo...
│  🗨️ *Comentario:* Qué mal :c
│  
╰─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╯

> Hecho por SoyMaycol
        `.trim();

        // Enviar al grupo
        await conn.sendMessage(m.chat, { text: mensajeAdios }, { quoted: m });

        // Enviar al canal
        try {
            await global.conn.sendMessage(canalId, {
                image: { url: pp },
                caption: mensajeAdios
            })
        } catch (canalError) {
            console.error('Error al enviar al canal:', canalError);
            try {
                await conn.reply(canalId, mensajeAdios);
            } catch (finalError) {
                console.error('Error final al enviar al canal:', finalError);
            }
        }
    }

    if (m.messageStubType == 27) {
        // Mensaje de bienvenida con la temática de Hanako-kun
        const mensajeBienvenida = `
╭─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╮
│  
│  ❀ *Bienvenido* al grupo de espíritus...  
│  ✦ *Hora:* ${moment().format('YYYY-MM-DD HH:mm:ss')}
│  ✦ *Mensaje:* ¡Ahora eres parte de nuestro mundo!
│  
╰─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╯

> Hecho por SoyMaycol
        `.trim();

        // Enviar al grupo
        await conn.sendMessage(m.chat, { text: mensajeBienvenida }, { quoted: m });

        // Enviar al canal
        try {
            await global.conn.sendMessage(canalId, {
                image: { url: pp },
                caption: mensajeBienvenida
            })
        } catch (canalError) {
            console.error('Error al enviar al canal:', canalError);
            try {
                await conn.reply(canalId, mensajeBienvenida);
            } catch (finalError) {
                console.error('Error final al enviar al canal:', finalError);
            }
        }
    }
          }
