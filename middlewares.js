
module.exports.useMiddlewares = async( express, app ) =>{
    const allowCrossDomain = function(req, res, next){
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Header','*');
        next();
    }
    // app.use('/uploads', express.static(__dirname + '/public/upload'))
    app.use(allowCrossDomain)
    app.use(require('morgan')('dev'))
    app.use(express.json())
    app.use(require('body-parser').json({limit: '1mb'}))
    app.use(require('body-parser').urlencoded({limit: '1mb', extended: true}))
    app.use(require('express-throttle-bandwidth')(1024 * 128)) /
    app.use(express.urlencoded({extended: true}))
}