var mang = new Array(10, 5, 2, 5, 6, 7, 8, 9)

console.log(mang)

function arraySum(array) {
    let sum = 0;
    array.forEach(item => {
        sum += item;
    });
    console.log("Tong la:", sum)
}


function isPrime(n) {
    if (n < 2) {
        return false;
    } else if (n == 2) {
        return true;
    } else {
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }
}

function primeNumber(array) {
    console.log("Cac so nguyen to la:")
    array.forEach(item => {
        if (isPrime(item)) {
            console.log(item);
        }
    });
}

function isDivisible(array) {
    console.log("Cac so chia het cho 3 la: ")
    array.forEach(item => {
        if (item % 3 == 0) {
            console.log(item)
        }
    });
}



new Promise((res, rej) => {
    setTimeout(() => {
        res(arraySum(mang));
    }, 3000)
}).then(result => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(primeNumber(mang));
        }, 3000)
    })
}).then(result => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(isDivisible(mang));
        }, 3000)
    })
})

