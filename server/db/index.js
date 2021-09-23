const pg = require("pg")
const dbParams = require("./db")

const pool = new pg.Pool(dbParams)

pool.connect().catch((error) => console.log(error))

module.exports = pool;