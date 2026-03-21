const CertiController=require('../controller/Certificate.controller');
const Certificaterouter=require('express').Router()
const { requireAuth, requireAdmin } = require('../middleware/authGuard');
const adminAuth = [requireAuth, requireAdmin];
Certificaterouter.post('/create',adminAuth,CertiController.CreateCertificate )
Certificaterouter.delete('/delete',adminAuth,CertiController.deleteCertificate)
Certificaterouter.put('/update',adminAuth,CertiController.updateCertificate)
Certificaterouter.get('/',CertiController.getCertificates)

module.exports=Certificaterouter;