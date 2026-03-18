const express=require('express');
const cors=require('cors')
const app=express();
const AuthRoutes=require('./routes/Auth.Routes')
app.use(cors())
app.use(express.json())

app.use('/api/admin',AuthRoutes)
// Test route
app.get('/', (req, res) => {
    res.send("API running 🚀");
});



module.exports=app;