const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// MongoDB connection
mongoose.connect('mongodb+srv://gollaanjimath123:1234567890@cluster0.fvgb7ow.mongodb.net/deals', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// User and Employee routes
app.use('/api/managers', require('./routes/manager'));
app.use('/api/employees', require('./routes/employee'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
