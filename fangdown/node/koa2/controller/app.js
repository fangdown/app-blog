const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router')
app.use(bodyParser())
router(app)
app.listen(3000, () => {
  console.log('app  run at port 3000')
})
