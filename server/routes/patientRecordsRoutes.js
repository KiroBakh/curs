const express = require('express');
const router = express.Router();
const patientRecordsController = require('../controllers/patientRecordsController');

router.get('/patientrecords', patientRecordsController.getAllPatientRecords);
router.get('/patientrecords/:id', patientRecordsController.getPatientRecordById);
router.post('/patientrecords', patientRecordsController.createPatientRecord);
router.put('/patientrecords/:id', patientRecordsController.updatePatientRecord);
router.delete('/patientrecords/:id', patientRecordsController.deletePatientRecord);

module.exports = router;
