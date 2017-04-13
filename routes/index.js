import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    name: "PS Type API",
    madeBy: "Anna, Valya, Liza"
  });
});

export default router;
