import { extname } from "path";

export const editFileName = (req, file, cb) => {
    if (file.originalname) {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        console.log(randomName)
        return cb(null, `${randomName}${extname(file.originalname)}`)
   
    }
    else {
        return cb(null, "NO-FILE");
    }
}

export const editFileNames  = (req, file, cb) => {
    
    if (file.originalname) {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
       // console.log(randomName)
        return cb(null, `${randomName}${extname(file.originalname)}`)
   
    }
    else {
        return cb(null, "NO-FILE");
    }
}