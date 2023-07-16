module.exports = (sequelize, DataTypes)=> {
    const Education = sequelize.define('educations', {
      // Model attributes are defined here
      class_name: {
        type: DataTypes.STRING
      },
      grade: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      passing_year: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
      },
    //   userId: {
        ContactId: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
      } // user for one to one
    }, {
      // Other model options go here
    });
     return Education;
    }