const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('employeedb', 'root', 'root', {
    host: 'localhost',
    logging: false,  // if default it is true and show queries log in console
    dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });


 try {
   sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const db = {};
  db.Sequelize=Sequelize;
  db.sequelize=sequelize;

 db.contact = require('./contact')(sequelize, DataTypes)
 db.user = require('./user')(sequelize, DataTypes, Model)

//   sequelize.sync({force:true});
  db.sequelize.sync({force:false});
  module.exports=db
  