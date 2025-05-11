import fetch from 'node-fetch'
import moment from 'moment-timezone'

const canalId = '120363372883715167@newsletter' // Canal donde enviar el mensaje

export async function before(m, { conn, participants }) {
    if (!m.messageStubType || !m.isGroup) return;

    const fkontak = {
        key: {
            participants: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            contactMessage: {
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Bot\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        participant: '0@s.whatsapp.net'
    };

    const jid = m.messageStubParameters?.[0]; // ID del usuario afectado
    let imgBuffer = null;

    if (jid) {
        try {
            const ppUrl = await conn.profilePictureUrl(jid, 'image');
            const res = await fetch(ppUrl);
            if (res.ok) imgBuffer = await res.buffer();
        } catch (e) {
            console.log('Error obteniendo imagen de perfil, usando genérica');
        }
    }

    const hora = moment().format('YYYY-MM-DD HH:mm:ss');
    const bienvenida = `
╭─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╮
│
│  ❀ *Bienvenido* al grupo de espíritus...
│  ✦ *Hora:* ${hora}
│  ✦ *Mensaje:* ¡Ahora eres parte de nuestro mundo!
│
╰─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╯

> Hecho por SoyMaycol`.trim();

    const despedida = `
╭─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╮
│
│  ❀ *Adiós* a nuestro espíritu...
│  ✦ *Hora:* ${hora}
│  ✦ *Razón:* Alguien dejó el grupo...
│  🗨️ *Comentario:* Qué mal :c
│
╰─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╯

> Hecho por SoyMaycol`.trim();

    const mensaje = m.messageStubType === 27 ? bienvenida
                   : (m.messageStubType === 28 || m.messageStubType === 32) ? despedida
                   : null;

    if (!mensaje) return;

    // Enviar al grupo
    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });

    // Enviar al canal
    try {
        if (imgBuffer) {
            await conn.sendMessage(canalId, {
                image: imgBuffer,
                caption: mensaje
            });
        } else {
            await conn.sendMessage(canalId, { text: mensaje });
        }
    } catch (err) {
        console.error('Error al enviar al canal:', err);
    }
}
