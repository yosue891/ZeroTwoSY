export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return!0;
  if (m.isGroup) return!1;
  if (!m.message) return!0;

  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return!0;

  const bot = global.db.data.settings[this.user.jid] || {};

  if (m.chat === '120363416409380841@newsletter') return!0;

  if (bot.antiPrivate &&!isOwner &&!isROwner) {
    // 📸 Ruta de la imagen que se enviará
    const imageUrl = 'https://files.catbox.moe/21xbdw.jpg'; // Reemplázala con la imagen que quieras usar

    // 🔗 Mensaje de alerta con el enlace del grupo
    const messageText = `😔 *Hola* @${m.sender.split`@`[0]},\n\n🚫 *Mi creador ha desactivado los comandos en chats privados, por lo que serás bloqueado.*\n\n🔗 *Si quieres usar los comandos, únete al grupo principal del bot:* https://chat.whatsapp.com/KqkJwla1aq1LgaPiuFFtEY`;

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl},
      caption: messageText,
      mentions: [m.sender]
});

    await this.updateBlockStatus(m.chat, 'block');
}

  return!1;
  }
