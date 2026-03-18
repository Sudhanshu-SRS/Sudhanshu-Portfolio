const express=require('express');
const cors=require('cors')
const app=express();
const AuthRoutes=require('./routes/Auth.Routes')
const CertificateRoutes=require('./routes/Certificate.Routes')
const uploadRoutes = require('./routes/upload.routes');
const projectRoutes = require('./routes/project.routes');
app.use(cors())
app.use(express.json())

app.use('/api/admin',AuthRoutes)
app.use('/api/projects',projectRoutes)
app.use('/api/certificate',CertificateRoutes)
app.use('/api/upload',uploadRoutes)


// Test route
app.get('/', (req, res) => {
    res.send("API running 🚀");
});



module.exports=app;