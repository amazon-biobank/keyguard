const { Sequelize, Model, DataTypes } = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, 
  {dialect: 'mysql', host: 'localhost'}
);

class DnaKey extends Model {}

DnaKey.init({
  dnaId: DataTypes.TEXT,
  secretKey: DataTypes.TEXT
}, {
  sequelize, 
  modelName: 'dnaKey' 
});

(async () => {
  try{
    await sequelize.sync();
  }
  catch(e){
    console.log(e)
  }
})();

module.exports = DnaKey;
