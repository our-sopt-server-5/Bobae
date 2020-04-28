crypto = require('crypto');
fs = require('fs');

var write = (addr, data) => {
    fs.writeFile(addr, data, (err) => {
        if (err) throw err;
        console.log('Success');
    })
}
const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 100000, 32, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        const hashed = derivedKey.toString('hex');
        write('./hashed.txt', hashed);

        /*
        // 다른 방법
        fs.writeFile('./Day02/hashed.txt', hashed, (err) => {
            if (err) throw err;
            console.log('Hashed & write file Success !');
        });
         */
    });
};


fs.readFile('./password.txt', (err, data) => {
    if (err) throw err;
    const salt = crypto.randomBytes(32).toString('hex');
    encrypt(salt, data);
})
