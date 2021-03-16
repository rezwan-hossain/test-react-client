const express = require('express');
const router = express.Router();

const {create, list, read, update, remove} = require('../controllers/post');


router.get('/', list)
      .post('/', create);
router.get('/:slug', read)
router.put('/:slug', update)
router.delete('/:slug', remove)



module.exports = router;