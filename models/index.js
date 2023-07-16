const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('employeedb', 'root', 'root', {
    host: 'localhost',
    logging: true,  // if default it is true and show queries log in console
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

 db.user = require('./user')(sequelize, DataTypes, Model)
 db.contact = require('./contact')(sequelize, DataTypes)
 db.user_contants = require('./userContacts')(sequelize, DataTypes,db.user, db.contact)
 db.education = require('./education')(sequelize,DataTypes)

 //  db.user.hasOne(db.contact,{foreignKey: 'user_id',as: 'contactDetails'}); // if you add in the model userId: DataTypes.INTEGER like no need to add her foreignKey name
 db.user.hasMany(db.contact);
 db.contact.belongsTo(db.user);

//  db.user.hasMany(db.education);
//  db.contact.belongsTo(db.user);

// db.contact.hasMany(db.education,{foreignKey: 'ContactId'});
// db.contact.belongsTo(db.contact,{foreignKey: 'ContactId'});

//  db.user.belongsToMany(db.contact, { through: 'user_contacts' });
//  db.contact.belongsToMany(db.user, { through: 'user_contacts' });


//   sequelize.sync({force:true});
  db.sequelize.sync({force:true});
  module.exports=db
  