
let isMomHappy = true;
let phone = {
    brand: 'Samsung',
    color: 'black'
};

var willGetNewPhone = new Promise((resolve, reject) => {
    if (isMomHappy)
        resolve(phone);
    else
        reject(new Error('Mom is not happy'));
});

willGetNewPhone
    .then((result) => console.log(result))
    .catch((result) => console.error(result));