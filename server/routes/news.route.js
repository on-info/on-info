const express = require('express');
const news = require('../controllers/news.controller');
const router = express.Router();
const multer = require('multer'); 
const upload = multer({
    limits: { fieldSize: 25 * 1024 * 1024 }
  });

router.post('/', upload.array(), news.createNews);
router.get('/', news.getNews);
router.get('/:id', news.getNewsById);
router.put('/:id', upload.array(), news.changeNews);
router.delete('/', news.deleteNews);
router.delete('/:id', news.deleteNewsById);

module.exports = router;