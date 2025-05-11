import fetch from 'node-fetch'
import moment from 'moment-timezone'

const canalId = '120363372883715167@newsletter' // Canal donde enviar el mensaje

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return !0;

    const fkontak = {
        key: {
            participants: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            contactMessage: {
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        participant: '0@s.whatsapp.net'
    };

    let ppUrl = await conn.profilePictureUrl(m.messageStubParameters?.[0], 'image').catch(_ => null);
    let imgBuffer = null;

    if (ppUrl) {
        try {
            imgBuffer = await (await fetch(ppUrl)).buffer();
        } catch (e) {
            console.error('Error descargando imagen de perfil:', e);
        }
    }

    let groupSize = participants.length;
    if (m.messageStubType == 27) groupSize++;
    else if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--;

    if (m.messageStubType == 28 || m.messageStubType == 32) {
        const mensajeAdios = `
╭─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╮
│    
│  ❀ *Adiós* a nuestro espíritu...    
│  ✦ *Hora:* ${moment().format('YYYY-MM-DD HH:mm:ss')}  
│  ✦ *Razón:* Alguien dejó el grupo...  
│  🗨️ *Comentario:* Qué mal :c  
│    
╰─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╯

> Hecho por SoyMaycol`.trim();

        await conn.sendMessage(m.chat, { text: mensajeAdios }, { quoted: m });

        try {
            if (imgBuffer) {
                await conn.sendMessage(canalId, {
                    image: imgBuffer,
                    caption: mensajeAdios
                });
            } else {
                await conn.sendMessage(canalId, { text: mensajeAdios });
            }
        } catch (canalError) {
            console.error('Error al enviar al canal:', canalError);
        }
    }

    if (m.messageStubType == 27) {
        const mensajeBienvenida = `
╭─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╮
│    
│  ❀ *Bienvenido* al grupo de espíritus...    
│  ✦ *Hora:* ${moment().format('YYYY-MM-DD HH:mm:ss')}  
│  ✦ *Mensaje:* ¡Ahora eres parte de nuestro mundo!  
│    
╰─「 🇯🇵 𝑯𝒂𝒏𝒂𝒌𝒐 𝑲𝒖𝒏 」─╯

> Hecho por SoyMaycol`.trim();

        await conn.sendMessage(m.chat, { text: mensajeBienvenida }, { quoted: m });

        try {
            if (imgBuffer) {
                await conn.sendMessage(canalId, {
                    image: imgBuffer,
                    caption: mensajeBienvenida
                });
            } else {
                await conn.sendMessage(canalId, { text: mensajeBienvenida });
            }
        } catch (canalError) {
            console.error('Error al enviar al canal:', canalError);
        }
    }
}
