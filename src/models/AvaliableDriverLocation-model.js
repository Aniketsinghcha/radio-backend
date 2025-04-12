const mongoose = require('mongoose');

// Define the schema for available drivers
const AvaliableDriversSchema = mongoose.Schema({
  location: {
    type: { type: String, enum: ['Point'], required: true },  
    coordinates: { type: [Number], required: true }, 
  },
  driversId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drivers',
    required: true,
  },
});

 
AvaliableDriversSchema.index({ location: '2dsphere' });

AvaliableDriversSchema.add({
  lat: {
    type: String,  
    required: true,
  },
  long: {
    type: String,  
    required: true,
  },
});

AvaliableDriversSchema.pre('save', async function (next) {
  if (this.lat && this.long) {
    this.location = {
      type: 'Point',
      coordinates: [parseFloat(this.long), parseFloat(this.lat)],  
    };
  }
  next();
});

 
AvaliableDriversSchema.pre('findOneAndUpdate', async function (next) {
  let update = this.getUpdate();
  if (update.$set) update = update.$set;

  if (update.lat && update.long) {
    update.location = {
      type: 'Point',
      coordinates: [parseFloat(update.long), parseFloat(update.lat)], // [long, lat]
    };
  }

  this.setUpdate({ $set: update });
  next();
});

// Create model
const AvaliableDrivers = mongoose.model('AvaliableDrivers', AvaliableDriversSchema);
module.exports = AvaliableDrivers;
