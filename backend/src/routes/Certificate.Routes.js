const CertiController=require('../controller/Certificate.controller');
const Certificaterouter=require('express').Router()
const Authmiddleware=require('../middleware/Auth.middleware')
Certificaterouter.post('/create',Authmiddleware,CertiController.CreateCertificate )
Certificaterouter.delete('/delete',Authmiddleware,CertiController.deleteCertificate)
Certificaterouter.put('/update',Authmiddleware,CertiController.updateCertificate)
Certificaterouter.get('/',CertiController.getCertificates)

module.exports=Certificaterouter;