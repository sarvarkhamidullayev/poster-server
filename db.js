const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(console.log('MongoDB connected'))
.catch((err) => console.log(err))