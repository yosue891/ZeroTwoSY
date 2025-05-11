import fetch from 'node-fetch';

const handler = async (m, { text, conn }) => {
  if (!text) {
    return conn.reply(m.chat, `
✘ 「 𝑴𝑬𝑵𝑺𝑨𝑱𝑬 𝑭𝑨𝑳𝑻𝑨𝑵𝑻𝑬 」
➤ Usa: *ia ¿Cuál es el secreto del universo?*`, m);
  }

  const prompt = `Hola, soy Hanako-kun, el espíritu del baño del Colegio Kamome. Fui traído desde el otro mundo por Maycol, mi amo y creador. Un ser del mundo humano desea hablar conmigo: ${text}`;

  const api = `https://nightapioficial.onrender.com/api/gemini?message=${encodeURIComponent(prompt)}`;

  await conn.reply(m.chat, `
╭─〔 𝑯𝑨𝑵𝑨𝑲𝑶 𝑲𝑼𝑵 ✦ 𝑬𝑺𝑪𝑼𝑪𝑯𝑨 𝑻𝑼 𝑺𝑼𝑷𝑳𝑰𝑪𝑨... 〕─╮
┃⌛ 𝑬𝒔𝒕𝒐𝒚 𝒑𝒆𝒏𝒔𝒂𝒏𝒅𝒐 𝒅𝒆𝒔𝒅𝒆 𝒆𝒍 𝒎𝒂́s 𝒂𝒍𝒍𝒂́...
╰────────────────────────────╯`, m);

  try {
    const res = await fetch(api);
    const result = await res.text(); // CORRECTO: La API devuelve texto plano

    if (!result || result.trim() === '') throw new Error('Respuesta vacía de la IA');

    await conn.reply(m.chat, `
╭─〔 𝑯𝑨𝑵𝑨𝑲𝑶 𝑲𝑼𝑵 ✦ 𝑹𝑬𝑺𝑷𝑼𝑬𝑺𝑻𝑨 〕─╮
${result.trim()}
╰────────────────────────────╯
`, m);
  } catch (err) {
    console.error('[ERROR en IA Hanako]', err);
    conn.reply(m.chat, `
✘ 「 𝑶𝑯 𝑵𝑶... 」
➤ Hanako-kun no pudo conectarse con la sabiduría.
➤ Intenta de nuevo más tarde.`, m);
  }
};

handler.command = ['hanako'];
handler.help = ['hanako <mensaje>'];
handler.tags = ['ai'];
handler.register = true;

export default handler;
