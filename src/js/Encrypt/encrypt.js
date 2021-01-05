const bcrypt = require('bcryptjs');

export default function encryptString(str, numSalts){
      return new Promise(function(resolve, reject) {
            bcrypt.genSalt(numSalts, function(err, salt) {
                  if(!err){
                        bcrypt.hash(str, salt, function(err, hash) {
                              if(!err){
                                    resolve(hash)
                              }else{
                                    reject(err)
                              }
                        })
                  }else{
                        reject(err)
                  }
            })
      })
}