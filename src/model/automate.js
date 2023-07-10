// const showDatabases = require('./showDatabases')
// const generate = require('./generate')

const Sequelize = require('sequelize');
const DB_Config = require('./psw/db.psw.json')

showDatabases().then((list) => {
  console.log(list);
  list.forEach(dataBaseName => {
    generate(dataBaseName)
  });
})

function showDatabases() {

  // 创建 Sequelize 实例
  const sequelize = new Sequelize({ ...DB_Config });

  // 获取所有数据库名称
  return sequelize.query('SHOW DATABASES', { raw: true }).then(([results, metadata]) => {
    // 提取数据库名称
    const databaseNames = results.map(result => result.Database);
    // 打印所有数据库名称
    const databaseNameList = []
    databaseNames.forEach(databaseName => {
      if (databaseName.startsWith("flowt")) {
        databaseNameList.push(databaseName)
      }
    });
    return databaseNameList
  })
    .catch(error => {
      console.error('Unable to fetch database names:', error);
      return []
    })
    .finally(() => {
      // 关闭 Sequelize 连接
      sequelize.close();
    });
}

function generate(database) {
  const Automate = require('sequelize-automate');
  // Database options, is the same with sequelize constructor options.
  const dbOptions = {
    database,
    ...DB_Config,
    define: {
      underscored: false,
      freezeTableName: false,
      charset: 'utf8mb4',
      timezone: '+00:00',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
      timestamps: false,
    },
  };

  // Automate options
  const options = {
    type: 'js', // Which code style want to generate, supported: js/ts/egg/midway. Default is `js`.
    camelCase: false, // Model name camel case. Default is false.
    // fileNameCamelCase: true, // Model file name camel case. Default is false.
    dir: 'src/model/' + database, // What directory to place the models. Default is `models`.
    typesDir: 'models', // What directory to place the models' definitions (for typescript), default is the same with dir.
    emptyDir: true, // Remove all files in `dir` and `typesDir` directories before generate models.
    tables: null, // Use these tables, Example: ['user'], default is null.
    skipTables: null, // Skip these tables. Example: ['user'], default is null.
    tsNoCheck: false, // Whether add @ts-nocheck to model files, default is false.
    match: null // RegExp to match table name
  }

  const automate = new Automate(dbOptions, options);

  automate.run();

}

module.exports = {
  generate, showDatabases
}