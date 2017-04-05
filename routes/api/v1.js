import express from 'express'; 
import auth from './auth';
const router = express.Router();

router.use('/', auth);

router.get('/', (req, res, next) => {
  res.json({
    name: "PS Type API",
    version: "1.0"
  });
});



export default router;