import { startBot, sendExcelFile } from './bot/index.js';
import { getDataFromDb } from './db/index.js';
import { saveDataToExcel } from './excel/index.js';
import { pedrasDeFogo, calumbi, calumbi2, beloJardim, supportNumber } from './config/index.js'

async function run(clientId) {
  const data = await getDataFromDb(clientId);
  await saveDataToExcel(data);
}

const client = await startBot();
async function start(clients) {
  clients.map(async (c) => {
    await run(c.id);
    await sendExcelFile(client, c);
  });
}

const clients = [
  {
    id: 12,
    name: 'Prefeitura de Pedras de Fogo',
    numbers: [pedrasDeFogo, supportNumber]
  }, 
  // {
  //   id: 31,
  //   name: 'Prefeitura de Cupira',
  //   numbers: [cupira]
  // },
  {
    id: 35,
    name: 'Prefeitura de Calumbi',
    numbers: [calumbi, calumbi2]
  },
  // {
  //   id: 37,
  //   name: 'Prefeitura de Ferreiros',
  //   numbers: [ferreiros]
  // },
  // {
  //   id: 39,
  //   name: 'Prefeitura De Belo Jardim',
  //   number: beloJardim
  // }
];

await start(clients);
setInterval(async () => {
  await start(clients);
}, 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
