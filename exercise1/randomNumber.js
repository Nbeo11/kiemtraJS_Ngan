function isPerfectNumber(num) {
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) {
            sum += i;
        }
    }
    return sum === num;
}

setInterval(() => {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(`Số ngẫu nhiên: ${randomNumber}`);
    
    if (isPerfectNumber(randomNumber)) {
        console.log(`${randomNumber} là số hoàn hảo.`);
    } else {
        console.log(`${randomNumber} không phải là số hoàn hảo.`);
    }
}, 2000);
