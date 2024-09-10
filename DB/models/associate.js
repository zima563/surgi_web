const ListenModel = require('./listen.model.js');
const userModel = require('./user.model.js');

// Setting up associations
userModel.hasMany(ListenModel, {
  foreignKey: 'AssignedAgent',  
  sourceKey: 'userName',       
  as: 'listens',           
});

ListenModel.belongsTo(userModel, {
  foreignKey: 'AssignedAgent',  
  targetKey: 'userName',        
  as: 'Agent',                  
});