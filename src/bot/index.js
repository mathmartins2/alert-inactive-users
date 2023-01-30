import { create } from 'venom-bot';

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
      path: `./professores-${clientName}.xlsx`,
      desc: 'Olá, segue o relatório de professores que não acessaram o sistema nos últimos 2 dias.',
    };
    
    numbers.forEach(async (n) => {
      console.log(`Sending file to ${n}...`);
      await client.sendFile(n, file.path, file.name, file.desc);
    })
    console.log('Excel file sent successfully');
  } catch (error) {
    console.log(error);
  }
}