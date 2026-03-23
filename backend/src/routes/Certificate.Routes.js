const CertiController=require('../controller/Certificate.controller');
const Certificaterouter=require('express').Router()
const { requireAuth, requireAdmin } = require('../middleware/authGuard');
const adminAuth = [requireAuth, requireAdmin];
Certificaterouter.post('/create',adminAuth,CertiController.CreateCertificate )
Certificaterouter.delete('/delete/:id',adminAuth,CertiController.deleteCertificate)
Certificaterouter.put('/update/:id',adminAuth,CertiController.updateCertificate)
Certificaterouter.get('/',CertiController.getCertificates)

module.exports=Certificaterouter;