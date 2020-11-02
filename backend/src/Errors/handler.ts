import {  ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors {
    [key:string]: string[]
}

const errorHandler:ErrorRequestHandler = (error, request, response, next) => {
    console.error(error)
    
    if(error instanceof ValidationError){
        let errors: ValidationErrors = {}

        error.inner.forEach(err => {
            errors[err.name] = err.errors
        })

        return response.json({message: 'validation fail',errors}).status(400)
    }
    return response.status(500).json({
        message: 'internal Server Error'
    })
}

export default errorHandler