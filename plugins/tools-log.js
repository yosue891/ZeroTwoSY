import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const handler = async (m, { conn }) => {
  const pluginDir = path.resolve('./plugins');
  let report = '📄 *LOG DE ERRORES EN PLUGINS*\n\n';

  const files = fs.readdirSync(pluginDir).filter(f => f.endsWith('.js'));

  for (let file of files) {
    const filePath = path.join(pluginDir, file);
    try {
      // Importación dinámica para ESM
      await import(pathToFileURL(filePath).href);
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
