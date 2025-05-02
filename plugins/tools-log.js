import fs from 'fs';
import path from 'path';

const handler = async (m, { conn }) => {
  const pluginDir = path.resolve('./plugins'); // Ruta absoluta a la carpeta
  let report = '📄 *LOG DE ERRORES EN PLUGINS*\n\n';

  const files = fs.readdirSync(pluginDir).filter(f => f.endsWith('.js'));

  for (let file of files) {
    const filePath = path.join(pluginDir, file);
    try {
      // Borrar caché para cargar de nuevo
      delete require.cache[require.resolve(filePath)];
      require(filePath); // Intentar importar
      report += `✅ ${file} — Sin errores\n`;
    } catch (err) {
      report += `❌ ${file} — *Error:* ${err.message.split('\n')[0]}\n`;
    }
  }

  if (files.length === 0) {
    report += 'No hay archivos .js en la carpeta /plugins.';
  }

  await conn.sendMessage(m.chat, { text: report }, { quoted: m });
};

handler.command = ['log'];
handler.tags = ['tools'];
handler.help = ['log'];
handler.register = true;
handler.group = false;

export default handler;
