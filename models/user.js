module.exports = (sequelize, DataTypes, Model) => {

class User extends Model {}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, //db level validations
    validate: {
      isAlpha: true
    },
    get() {
      const rawValue = this.getDataValue('firstName');
      return rawValue ? rawValue.toUpperCase() : null;
    }
  },
  lastName: {
    type: DataTypes.STRING,
    defaultValue: 'Pal',
    validate: {
      isAlphanumeric: {
        msg: "Must be Alphanumeric"
      }
    },
    // allowNull defaults to true
    set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      this.setDataValue('lastName', value + 'Indian');
    }
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    }
  },
  status:DataTypes.INTEGER
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'user', // We need to choose the model name
  paranoid: true,
  deletedAt: 'soft_delete',
});
 return User;
}