const responseCodes = (object = {}, code, objectName='object') => {
    switch(code) {
        case 200:
            response = {
                code: 200, 
                message: 'OK', 
                [objectName]: object
            }
            break;
        case 400:
            response = {
                code: 400, 
                message: 'Bad Request'
            }
            break;       
        case 404:
            response = {
                code: 404, 
                message: 'Not Found'
            }
            break;            
        case 500:
            response = {
                code: 500, 
                message: 'Internal Server Error'
            }
            break;    
    }
    return response;
}