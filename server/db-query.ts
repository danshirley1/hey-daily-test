const mysql = require('mysql2/promise');
const { readFileSync } = require('fs');

type MySqlConnection = {
  query: (query: string) => any;
};

async function connect(): Promise<MySqlConnection> {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'foobar', // This would come from environment in production obvs
    database: 'heydaily',
    multipleStatements: true,
  });

  return connection;
}

async function testConnectivity(): void {
  try {
    await connect();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error(`Unable to connect to the database: ${error.message}`);
    process.exit(1);
  }
}

async function createDbStructure(): void {
  const connection = await connect();
  const tableStructure = readFileSync('./db/create-tables.sql').toString();

  console.log('Creating table structure...');
  await connection.query(tableStructure);
  console.log('Table structure created ok!');
}

async function runQuery(query: string): void {
  const connection = await connect();

  await connect();
  await connection.query(query).catch((err) => {
    console.error(err);
  });
}

async function init(): void {
  await testConnectivity();
  await createDbStructure();
  process.exit();
}

module.exports = {
  init,
  runQuery,
};
