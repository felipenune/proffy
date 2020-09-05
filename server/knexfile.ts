import path from 'path'

module.exports = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user : 'postgres',
    password : 'docker',
    database : 'proffydb'
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  useNullAsDefault: true
}