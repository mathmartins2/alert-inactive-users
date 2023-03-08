import { create } from 'venom-bot';
import { supportNumber } from '../config/index.js';

export async function startBot() {
  console.log('Starting Venom Bot...');

  const client = await create({
    session: 'session-name',
    multidevice: true,
  });
  console.log('Venom Bot Started');
  return client;
}

export async function sendExcelFile(client, clientData) {
  console.log('Sending Excel file...');
  try {
    const { name, numbers } = clientData;
    const clientName = name.replace(/ /g, '-').toLowerCase();
    
    const file = {
      name: `professores-${clientName}.xlsx`,
      path: `professores-${clientName}.xlsx`,
      desc: 'Olá, segue o relatório de professores que não acessaram o sistema nos últimos 2 dias.',
    };
    
    await numbers.forEach(async (n) => {
      await client.sendFile(n, file.path, file.name, file.desc).then(() => {
        console.log('sendFile1')
      }).catch((error) => {
        console.log(error)
      })
      await client.sendText(n, 'Não Responda essa mensagem! Qualquer dúvida, entre em contato com o suporte').then(() => {
        console.log('sendFile')
      }).catch((error) => {
        console.log(error)
      })
      await client.sendContactVcard(n, supportNumber, 'Suporte Gerencial').then(() => {
        console.log('sendFile2')
      }).catch((error) => {
        console.log(error)
      })
    })
    console.log('Excel file sent successfully');
  } catch (error) {
    console.log(error);
  }
}