const Router = require('koa-router');

const {findPosition, showLine, filterLine, popLine, createUser, addToLine} = require('./controllers/gerenciamentoDeFilas')

const router = new Router();

router.get('/findPosition', findPosition);
router.get('/showLine', showLine);
router.get('/filterLine', filterLine);
router.get('/popLine', popLine);
router.post('/createUser', createUser);
router.post('/addToLine', addToLine);

module.exports = router;