var db = require('../models')
var User = db.user;
var Contact = db.contact;
// var userContacts = db.user_contants;
var Education = db.education;

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
    
    var oneToOneUser = async (req,res) => {
    //   const data = await User.create({firstName: "priya", lastName: "new1"})
    //   if(data && data.id){
    //     await Contact.create({permanent_address: 'new jain indore', current_adress: 'plasia', pin_code_four: '452014', user_id: user.id})
    //   }  

    // var data = await User.findAll({
    //     attributes:['firstName'],
    //     include:[{
    //         model: Contact,
    //         as: 'contactDetails',
    //         attributes:['permanent_address']
    //     }],
    // })

    var data = await Contact.findAll({
        attributes:['permanent_address'],
        include:[{
            model: User,
            as: 'userDetails',
            attributes:['firstName']
        }],
    })
      res.status(200).json({data:data});   

    }
 
    var oneToManyUser =  async (req,res) => {
        // const data =  await Contact.create({permanent_address: 'new jain indore1', current_adress: 'plasia1', pin_code_four: '452015', user_id: 1})
        
        var data = await User.findAll({
        attributes:['firstName'],
        include:[{
            model: Contact,
            as: 'contactDetails',
            attributes:['permanent_address']
        }],
    })


        res.status(200).json({data:data}); 
    }

    var manyToManyUser = async (req,res) => {
        // var user = await User.create({firstName: "aditi", lastName: "rathore1"})
        // if(user && user.id){
        //   var contact = await Contact.create({permanent_address: 'sanawad', current_adress: 'indore', pin_code_four: '452043'})
        // }
        // if(user.id && contact.id){
        //     await userContacts.create({userId: user.id, contactId: contact.id})
        // }
        // var data = {}
        var data = await User.findAll({
            attributes:['firstName'],
            include:[{
                model: Contact,
                attributes:['permanent_address']
            }],
            where: {
              id: 9,
            },
        })
          res.status(200).json({data:data});   
        
    }

    var paranoidUser =  async (req,res) => {
        // var data = await User.create({firstName: "shreya", lastName: "sharma"})
        // var data =   await User.destroy({
        //     where: {
        //       id: 1
        //     }
        //   });
        var data = await User.findAll({paranoid: false

        })
        res.status(200).json({data:data});      
    }

    var loadingUser =   async (req,res) => {
        // var user = await User.create({firstName: "shreya", lastName: "sharma"})
        // if(user && user.id){
        //   var contact = await Contact.create({permanent_address: 'bhopal', current_adress: 'indore', pin_code_four: '452043', userId: user.id})
        // }
        var data = await User.findOne({
            where: {
                id:1
            }
        })
        var contactData = await data.getContacts();
        res.status(200).json({data:contactData});  
    }

    var eagerUser = async (req,res) => {
        var data = await User.findAll({
            include:[{all:true,nested:true}] //work for default relation data show
           
            // include:[{
            //     model: Contact,
            //     required: true, //  inner joint if true , false 
            //     right: true // right outer joint
            // },{
            //     model: Education
            // }]
        })
        res.status(200).json({data:data});  
    }

    var creatorUser = async (req,res) => {
        try {
            await Contact.create({
                permanent_address: "indore",
                current_adress: "sanawad",
                user: {
                    firstName: "Ram",
                    lastName: "Pal1"
                } 
                
            },{
                include:[db.contactUser]
            })
            var data = await User.findAll({
                include:{
                    model:Contact
                }
            }) 
            
        } catch (error) {
          console.error('Error inserting data into contacts table:', error);
        }
        
        res.status(200).json({data:data});  
    }

    var scopesUser = async (req,res) => {
        // var data = {};
    //    var data = await User.create({firstName: "aditi", lastName: "sharma", status: 1 })
    //    if(data && data.id){
    //       var contact = await Contact.create({permanent_address: 'pune', current_adress: 'pune', pin_code_four: '452041', userId: data.id})
    //     }
    User.addScope('checkStatus',{ //scope define
       where: {
        status: 1
       }
    })

    User.addScope('lastNameChecker',{ //scope define
        where: {
         lastName: 'sharmaIndian'
        }
     })

     

    // var data = await User.scope(['checkStatus', 'lastNameChecker']).findAll({});
       User.addScope('includeContact',{
        include:{
            model:Contact,
            attributes: ['permanent_address']
        }
       })

       User.addScope('userAttributes',{
        attributes:['firstName']
       })
       
       User.addScope('limits',{
        limit:1
       })

       let data = await User.scope(['includeContact', 'userAttributes', 'limits']).findAll({})
        res.status(200).json({data:data}); 
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
    rawQueriesUser,
    oneToOneUser,
    oneToManyUser,
    manyToManyUser,
    paranoidUser,
    loadingUser,
    eagerUser,
    creatorUser,
    scopesUser

}