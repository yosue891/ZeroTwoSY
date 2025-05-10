let handler = async (m, { conn, args, text }) => {
  if (!text) return conn.sendMessage(m.chat, { text: '✏️ Escribe un texto para tu cuaderno.\n\nEjemplo:\n*cuaderno Hola mundo*' }, { quoted: m });

  let url = `https://delirius-apiofc.vercel.app/canvas/book?text=${encodeURIComponent(text)}&footer=MaycolAIUltraMD`;

  try {
    await conn.sendMessage(m.chat, {
      image: { url },
      caption: `✿ Tu cuaderno mágico fue creado por *MaycolAIUltraMD*`
    }, { quoted: m });
  } catch (e) {
    await conn.sendMessage(m.chat, { text: '⚠️ Hubo un error al generar el cuaderno.' }, { quoted: m });
  }
};

handler.help = ['cuaderno <texto>'];
handler.tags = ['fun'];
handler.command = ['cuaderno'];
handler.register = true;

export default handler;
