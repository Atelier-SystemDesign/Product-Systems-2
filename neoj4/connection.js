const neo4j = require('neo4j-driver');

(async () => {

  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = "neo4j://localhost:7687"
  const USER = "neo4j"
  const PASSWORD = "froginadarkwell"
  let driver

  try {
    driver = neo4j.driver(URI,  neo4j.auth.basic(USER, PASSWORD))
    await driver.verifyConnectivity()
    console.log('Connection estabilished')
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
    await driver.close()
    return
  }

  // Use the driver to run queries

  await driver.close()
})();