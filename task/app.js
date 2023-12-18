// // app.js

// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const bcrypt = require('bcrypt');
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true
// }));
// app.set('view engine', 'ejs');

// mongoose.connect('mongodb://localhost/task_manager', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// const User = mongoose.model('User', {
//   username: String,
//   password: String
// });

// const Task = mongoose.model('Task', {
//   title: String,
//   description: String,
//   dueDate: Date,
//   status: String,
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// });

// // Middleware to check if the user is authenticated
// const authenticateUser = (req, res, next) => {
//   if (!req.session.userId) {
//     res.redirect('/login');
//   } else {
//     next();
//   }
// };

// // Routes
// app.get('/', authenticateUser, (req, res) => {
//   Task.find({ user: req.session.userId }, (err, tasks) => {
//     if (err) {
//       console.error(err);
//       res.send('Error fetching tasks');
//     } else {
//       res.render('dashboard', { username: req.session.username, tasks });
//     }
//   });
// });

// app.get('/login', (req, res) => {
//   res.render('login', { message: '' });
// });

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({ username });

//   if (user && await bcrypt.compare(password, user.password)) {
//     req.session.userId = user._id;
//     req.session.username = user.username;
//     res.redirect('/');
//   } else {
//     res.render('login', { message: 'Invalid username or password' });
//   }
// });

// app.get('/register', (req, res) => {
//   res.render('register', { message: '' });
// });

// app.post('/register', async (req, res) => {
//   const { username, password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     res.render('register', { message: 'Passwords do not match' });
//     return;
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({
//     username,
//     password: hashedPassword
//   });

//   newUser.save((err, user) => {
//     if (err) {
//       console.error(err);
//       res.render('register', { message: 'Error creating user' });
//     } else {
//       req.session.userId = user._id;
//       req.session.username = user.username;
//       res.redirect('/');
//     }
//   });
// });

// app.get('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       console.error(err);
//     }
//     res.redirect('/login');
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


// app.js

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const argon2 = require('argon2'); // Use argon2 instead of bcrypt
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/task_manager', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const User = mongoose.model('User', {
  username: String,
  password: String
});

const Task = mongoose.model('Task', {
  title: String,
  description: String,
  dueDate: Date,
  status: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    next();
  }
};

// Routes
app.get('/', authenticateUser, (req, res) => {
  Task.find({ user: req.session.userId }, (err, tasks) => {
    if (err) {
      console.error(err);
      res.send('Error fetching tasks');
    } else {
      res.render('dashboard', { username: req.session.username, tasks });
    }
  });
});

app.get('/login', (req, res) => {
  res.render('login', { message: '' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && await argon2.verify(user.password, password)) { // Use argon2.verify instead of bcrypt.compare
    req.session.userId = user._id;
    req.session.username = user.username;
    res.redirect('/');
  } else {
    res.render('login', { message: 'Invalid username or password' });
  }
});

app.get('/register', (req, res) => {
  res.render('register', { message: '' });
});

app.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.render('register', { message: 'Passwords do not match' });
    return;
  }

  try {
    const hashedPassword = await argon2.hash(password); // Use argon2.hash instead of bcrypt.hash
    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();

    req.session.userId = newUser._id;
    req.session.username = newUser.username;
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('register', { message: 'Error creating user' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
