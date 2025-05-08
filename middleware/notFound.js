function notFound(req, res, next){
    res.status(404)
    res.json({
        error: 'not Found',
        message: 'pagina non trovata'
    })
}

module.exports = notFound;