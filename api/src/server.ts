const express = require('express')
const app = express()
const port = 3000

import router from "./routes/repository";

app.use('/repository', router);

app.get('/', (req: any, res: any) => {
  res.send('Hello Worldd!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
