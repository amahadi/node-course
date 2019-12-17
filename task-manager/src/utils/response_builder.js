const responseBuilder = (code) => {
    code = parseInt(code)
    if(code === 200){
        response = {
            code: 200, 
            message: 'OK'
        }
    } else if(code === 201){
        response = {
            code: 201, 
            message: 'Created'
        }
    } else if(code === 400){
        response = {
            code: 400, 
            message: 'Bad Request'
        }
    } else if(code === 401){
        response = {
            code: 401, 
            message: 'Unauthorized'
        }
    } else if(code === 404){
        response = {
            code: 404, 
            message: 'Not Found'
        }
    } else if(code === 422){
        response = {
            code: 422, 
            message: 'Unprocessable Entity'
        }
    }else if(code === 500){
        response = {
            code: 500, 
            message: 'Internal Server Error'
        }
    } else if(code === 503){
        response = {
            code: 503, 
            message: 'Service Unavailable'
        }
    }
    return response;
}

module.exports = responseBuilder;