// Different types of errors that can occur
export const enum ErrorTypes {
    Required = 'RequiredValue',
    Duplicate = 'TakenValue',
    NotFound = 'NotFound',
    Syntax = 'Syntax',
    Authentication = 'Authentication',
    Server = 'Internal',
    Default = 'DefaultErrorMessage'
} 


// Creating an error log
export interface ErrorLogProps {
  type: ErrorTypes
  message: string
}