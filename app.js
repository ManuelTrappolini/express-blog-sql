const express = require('express');
const app = express();
const router = require('./routes/routesPosts.js')
app.use(express.json())
const notFoundMiddleware = require('./Middleware/notFoundMiddleware.js')
const logger = require('./Middleware/logger.js')
const postControllers = require('./Controllers/post.js')
const host = 'http://127.0.0.1';
const port = 3002;
app.use(express.static('public'));

var cors = require('cors')



app.listen(port, () => {
    console.log(`Use this link ${host}:${port}`);
})


app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})

app.use(cors())

app.get('/', postControllers.index)

app.use('/posts', router)

app.use(logger)

app.use(notFoundMiddleware)

/* app.use('/posts', (error,req,res,next) =>{
    throw new Error ('this is a custom error')
})
 */
app.use((error, req, res, next) => {
    console.error(err.stack)

    res.status(500).send({
        status: 500,
        message: 'You broke everything',
        error: err.message
    })
})