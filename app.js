const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error(error);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('MongoDB connected!');
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  });
  
  const User = mongoose.model('User', userSchema);
  
  const newUser = new User({
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456'
  });
  
  newUser.save().then(() => {
    console.log('New user created!');
  }).catch((error) => {
    console.error('Error creating user:', error);
  });
  
  User.find().then((users) => {
    console.log('All users:', users);
  }).catch((error) => {
    console.error('Error retrieving users:', error);
  });

