var db = require('../models')
var User = db.user;
const { Sequelize, Op, QueryTypes } = require('sequelize');

var addUser = async (req, res) => {
// const jane = User.build({ firstName: "rahul" ,lastName: "pal" });
const jane = await User.create({ firstName: "banti" ,lastName: "N" });
console.log(jane instanceof User); // true
console.log(jane.name); // "Jane"
// jane.set({
//     firstName: "Aditi",
//     lastName: "blue"
//   });
// await jane.update({ firstName: "banti" ,lastName: "N" })
await jane.destroy();
// await jane.save();
console.log('Jane was saved to the database!');
console.log(jane.toJSON()); // This is good!
res.status(200).json();
}

var getUsers = async(req, res) => {
    const allData = await User.findAll({ });
    res.status(200).json({data:allData});  
}

var getUser = async(req, res) => {
    const Data = await User.findOne({
        where: {
            id: req.params.id
        }
     });
    res.status(200).json({data:Data});  
}

var postUsers = async(req, res) => {
    var postData = req.body;
    if(postData.length>1){
      var Data = await User.bulkCreate(postData);     
    }else{
      var Data = await User.create(postData);
    }
    res.status(200).json({data:Data});  
    
}

var deleteUser = async(req, res) => {
    const Data = await User.destroy({
        where: {
            id: req.params.id
        }
     });
    res.status(200).json({data:Data});  
}

var patchUser = async(req, res) => {
    var updatedData = req.body;
    const Data = await User.update(updatedData,{
        where: {
            id: req.params.id
        }
     });
    res.status(200).json({data:Data});  
}

// var queryUser = async(req, res) => {
//     const data = await User.create({
//         firstName: 'alice123',
//         lastName: 'gupta'
//       }, { fields: ['firstName'] });
//     res.status(200).json({data:data});  
//     // fields allowed if firstName create and lasName default 
// }

var queryUser = async(req, res) => {
    // const data = await User.findAll({
    //     // attributes: ['firstName', 'lastName']
    //     // attributes: ['firstName', ['lastName', "last_name"]]
    //     attributes: ['id',['firstName', "first_name"]]
    //   });
    const data = await User.findAll({
        // where: {

        //   id: {
        //     [Op.eq]: 1
        //   }

        // [Op.and]: [
        //     { id: 1 },
        //     {firstName: 'banti'}
           
        //   ]

     
        // [Op.or]: [1, 8]
          
        // }
        order:  [
            ['id', 'DESC']
         ]
      });
      res.status(200).json({data:data});   

}

var findersUser = async(req, res) => {
    // const data = await User.findByPk(10)
    const [user, created] = await User.findOrCreate({
        where: { firstName: 'dipika' },
        defaults: {
          lastName: 'Technical Lead JavaScript'
        }
      });
    res.status(200).json({data:user,created:created});   
}

var getSetVirtual = async(req, res) => {
    // const data = await User.findByPk(10)
    const data = await User.findAll({
        where: { firstName: 'banti' }
      });
   
    // const data = await User.create({
    //   firstName: 'hero',
    //   lastName: 'last of the name'

    // });
    res.status(200).json({data:data});   
}

    var getValidations = async(req, res) => {
        var data={};
        var messages={};
        try {
            data = await User.create({
                firstName: 'hero45',
                lastName: 'last of the name'
        
                });
            
        } catch (e) {
            // console.log(e.errors)
            let message;
            e.errors.forEach(error=>{
               switch (error.validatorName) {
                case 'isAlpha':
                    message= 'Only alphabets are allowed';
                    break;
                case 'isAlphanumeric':
                        message=error.message
                        break;    
               } 
               messages[error.path]= message
            })
        }
        res.status(200).json({data:data, messages:messages});   
    }
   
    var rawQueriesUser = async (req,res) => {
        // const users = await db.sequelize.query("SELECT * FROM `users`", 
        // {   type: QueryTypes.SELECT,
        //     model: User, //map queries with model 
        //     mapToModel: true  });
        const users = await db.sequelize.query(
            'SELECT * FROM users WHERE lastName = ?',
            {
              replacements: ['last', 'Indian'],
              type: QueryTypes.SELECT
            }
          );
// We didn't need to destructure the result here - the results were returned directly
        res.status(200).json({data:users});   

    }

module.exports = {
    addUser,
    getUsers,
    getUser,
    postUsers,
    deleteUser,
    patchUser,
    queryUser,
    findersUser,
    getSetVirtual,
    getValidations,
    rawQueriesUser

}