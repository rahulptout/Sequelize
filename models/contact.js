module.exports = (sequelize, DataTypes)=> {
const Contact = sequelize.define('contacts', {
  // Model attributes are defined here
  permanent_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  current_adress: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  pin_code_four: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false 
  } // user for one to one
}, {
  // Other model options go here
});
 return Contact;
}