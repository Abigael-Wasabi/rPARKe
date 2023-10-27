const User = require('./user');
const Car = require('./car');
const ParkingSlot = require('./parkSlot');

// Associations
User.hasOne(Car, { foreignKey: 'userID' });
Car.belongsTo(User, { foreignKey: 'userID' });

User.belongsTo(ParkingSlot, { foreignKey: 'parkingSlotID' });
ParkingSlot.hasOne(User, { foreignKey: 'parkingSlotID' });

Car.belongsTo(ParkingSlot, { foreignKey: 'carID' });
ParkingSlot.hasOne(Car, { foreignKey: 'carID' });


module.exports = {User,Car,ParkingSlot};