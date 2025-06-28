// const client = require('./db.connection');
// const createTables = require('./models/createTables');
// const insertInitialData = require('./models/insertData');
// const runQueries = require('./models/queries');

import client from "./src/DB/db.connection.js";
import createTables from "./src/DB/Models/createTables.js";
import insertInitialData from "./src/DB/Models/insertData.js";
import runQueries from "./src/DB/Models/queries.js";

async function main() {
  try {
    await client.connect();

    // await createTables();
    // await insertInitialData();
    await runQueries();

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

main();
