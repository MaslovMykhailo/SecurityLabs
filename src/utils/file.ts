import fs from 'fs'

export const readFile = (
    path: string,
    encoding: BufferEncoding = 'utf8'
) => new Promise<string>(
    (resolve, reject) => fs.readFile(
        path,
        {encoding},
        (error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        }
    )
)

export const writeFile = (
    path: string,
    data: string,
    encoding: BufferEncoding = 'utf8' 
) => new Promise<void>(
    (resolve, reject) => fs.writeFile(
        path,
        data,
        {encoding},
        (error) => {
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        }
    )    
)
