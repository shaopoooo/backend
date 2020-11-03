const mongoose = require('mongoose');

const connections = {};

exports.getDbConnect = (dbName) => {
  if (connections[dbName]) {
    return connections[dbName];
  }
  const url = `mongodb://${process.env.DB_HOST}/${dbName}`;
  const opt = { useNewUrlParser: true, useUnifiedTopology: true };
  connections[dbName] = mongoose.createConnection(url, opt);
  // const db = {};
  // if (dbName === 'universal') {
  //   User = connections[dbName].model('user', userSchema);
  //   Factory = connections[dbName].model('factory', factorySchema);
  // }
  return connections[dbName];
};
