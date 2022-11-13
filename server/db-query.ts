const mysql = require('mysql2/promise');
const { readFileSync } = require('fs');

async function connect() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'foobar', // This would come from environment in production obvs
    database: 'heydaily',
    multipleStatements: true,
  });

  return connection;
}

async function testConnectivity() {
  try {
    await connect();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

async function createDbStructure() {
  const connection = await connect();

  const tableStructure = fs.readFileSync('./db/create-tables.sql').toString();

  console.log('tableStructure:', tableStructure.toString());

  await connection.query(tableStructure);
}

async function init() {
  await testConnectivity();
  await createDbStructure();
  process.exit();
}

module.exports = {
  init,
};
