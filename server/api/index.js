const router = require('express').Router();

module.exports = router;

router.use('/thermostat', require('./thermostat'));
router.use('/trends', require('./trends'));

router.use((req, res, next) => {
  res.status(404).send('Not found');
});
