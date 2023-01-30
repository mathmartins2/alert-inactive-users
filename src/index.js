import { startBot, sendExcelFile } from './bot/index.js';
import { getDataFromDb } from './db/index.js';
import { saveDataToExcel } from './excel/index.js';
import { pedrasDeFogo, cupira, calumbi, calumbi2, ferreiros, beloJardim } from './config/index.js'

async function run(client_id) {
  const data = await getDataFromDb(client_id);
  await saveDataToExcel(data);
}

async function start(clients) {
  const client = await startBot();
  clients.map(async (c) => {
    await run(c.id);
    await sendExcelFile(client, c);
  });
}

const clients = [
  {
    id: 12,
    name: 'Prefeitura de Pedras de Fogo',
    numbers: [pedrasDeFogo]
  }, 
  // {
  //   id: 31,
  //   name: 'Prefeitura de Cupira',
  //   numbers: [cupira]
  // },
  {
    id: 35,
    name: 'Prefeitura de Calumbi',
    numbers: [calumbi]
  },
  {
    id: 37,
    name: 'Prefeitura de Ferreiros',
    numbers: [ferreiros]
  },
  // {
  //   id: 39,
  //   name: 'Prefeitura DE Belo Jardim',
  //   number: beloJardim
  // }
];

await start(clients);
setTimeout(() => process.exit(0), 10000);