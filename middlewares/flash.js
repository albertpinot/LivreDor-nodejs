// modularisation
module.exports = function (request, response, next) {

    if (request.session.flash) {
        response.locals.flash = request.session.flash
        request.session.flash = undefined
    }
    
    request.flash = function(type, content) {
        
        // Si request.session.flash n'existe pas 
        if (request.session.flash === undefined) {
            request.session.flash = {}
        } 
        request.session.flash[type] = content
    }
    
    next()
} 