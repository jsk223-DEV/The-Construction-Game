
localStorage.clear();
localStorage.setItem('balance', 0);
addIncome(300_000, 'Game Start');
function displayBalance(amount) {
    let result = 0;
    const total = document.getElementById('balance');
    result = Number(amount) + Number(localStorage.getItem('balance'));
    localStorage.setItem('balance', result);
    let rResult = commify(result);
    if(rResult.charAt(0) == '-'){
        rResult = rResult.slice(1);
        total.innerHTML = '-$' + rResult;
        total.style.color = 'red';
    }else{
        total.innerHTML = '$' + rResult;
        total.style.color = 'green';
    }
}
function commify(res) {
    res = parseFloat(res).toFixed(2);
    res = res.toString();
    let decimal = '';
    let negative = false;
    let decimalPos;
    if (res.includes('.')) {
        for(let i = 0; i < res.length; i++){
            if(res[i] == '.'){
                decimalPos = i;
            }
        }
        decimal = res.slice(decimalPos);
        res = res.slice(0, decimalPos);
        if (decimal.length == 2){
            decimal += '0';
        }
    } else { decimal = '' }
    if (res.charAt(0) == '-') {
        negative = true;
        res = res.slice(1);
    } else { negative = false }
    if (res.length > 3) {
        const arr = [];
        let totalCommas = Math.floor(res.length / 3);
        let i = 0;
        let startPosition;
        let endPosition;
        let oddNums = res.length - totalCommas * 3;
        while (i < totalCommas) {
            startPosition = -3 + i * -3;
            endPosition = startPosition + 3;
            if (endPosition == 0) {
                endPosition = res.length;
            }
            arr.unshift(res.slice(startPosition, endPosition));
            i++
        }
        
        if (oddNums > 0 && !negative) { return res.slice(0, oddNums) + ',' + arr.toString() + decimal }
        else if (oddNums == 0 && !negative) { return arr.toString() + decimal }
        else if (oddNums > 0 && negative) { return '-' + res.slice(0, oddNums) + ',' + arr.toString() + decimal }
        else if (oddNums == 0 && negative) { return '-' + arr.toString() + decimal }
    }
    else { return res + decimal }
}
    function addExpense(num, message = 'Misc') {
        const financeList = document.getElementById('money-list');
        // num = parseFloat(num).toFixed(2);
        financeList.innerHTML += '<li class="expense">$' + commify(num) + ' ' + message + '</li>';
        displayBalance('-' + num);
    }
    function addIncome(num, message = 'Misc') {
        const financeList = document.getElementById('money-list');
        // num = parseFloat(num).toFixed(2);
        financeList.innerHTML += '<li class="income">$' + commify(num) + ' ' + message + '</li>';
        displayBalance(num);
    }
    
    const backhoe = {
        amountOwned: 2,
        price: 50_000,
        base: 1_000,
        buyOne: function(){
            if(this.price <= localStorage.getItem('balance')){
            const backOwned = document.getElementById('back-owned');
            this.amountOwned += 1;
            backOwned.innerHTML = this.amountOwned;
            addExpense(this.price, 'New Backhoe');
        }else{
            alertBox('You currently do not have enough money to buy a backhoe.');
        }
    },
    double: function(){
        document.getElementById('dback-ind').style.display = 'inline';
        this.amountOwned *= 2;
    },
    undouble: function(){
        document.getElementById('dback-ind').style.display = 'none';
        this.amountOwned /= 2;
    }
}
const dozer = {
    amountOwned: 1,
    price: 75_000,
    base: 2_000,
    buyOne: function(){
        if(this.price <= localStorage.getItem('balance')){
            const backOwned = document.getElementById('dozer-owned');
            this.amountOwned += 1;
            backOwned.innerHTML = this.amountOwned;
            addExpense(this.price, 'New Dozer');
        }else{
            alertBox('You currently do not have enough money to buy a dozer.');
        }  
    },
    double: function(){
        document.getElementById('ddozer-ind').style.display = 'inline';
        this.amountOwned *= 2;
    },
    undouble: function(){
        document.getElementById('ddozer-ind').style.display = 'none';
        this.amountOwned /= 2;
    }
}
const excavator = {
    amountOwned: 0,
    price: 100_000,
    base: 3_000,
    buyOne: function(){
        if(this.price <= localStorage.getItem('balance')){
            const backOwned = document.getElementById('exca-owned');
            this.amountOwned += 1;
            backOwned.innerHTML = this.amountOwned;
            addExpense(100_000, 'New Excavator');
        }else{
            alertBox('You currently do not have enough money to buy a excavator.');
        }
    },
    double: function(){
        document.getElementById('dexca-ind').style.display = 'inline';
        this.amountOwned *= 2;
    },
    undouble: function(){
        document.getElementById('dexca-ind').style.display = 'none';
        this.amountOwned /= 2;
    }
}
const grader = {
    amountOwned: 0,
    price: 150_000,
    base: 5_000,
    buyOne: function(){
        if(this.price <= localStorage.getItem('balance')){
            const backOwned = document.getElementById('grade-owned');
            this.amountOwned += 1;
            backOwned.innerHTML = this.amountOwned;
            addExpense(this.price, 'New Grader');
        }else{
            alertBox('You currently do not have enough money to buy a grader.');
        }
    },
    double: function(){
        document.getElementById('dgrade-ind').style.display = 'inline';
        this.amountOwned *= 2;
    },
    undouble: function(){
        document.getElementById('dgrade-ind').style.display = 'none';
        this.amountOwned /= 2;
    }

}
const scraper = {
    amountOwned: 0,   
    price: 200_000,
    base: 7_000,
    buyOne: function(){
        if(this.price <= localStorage.getItem('balance')){
            const backOwned = document.getElementById('scrape-owned');
            this.amountOwned += 1;
            backOwned.innerHTML = this.amountOwned;
            addExpense(this.price, 'New Scraper');
        }else{
            alertBox('You currently do not have enough money to buy a scraper.');
        }
    },
    double: function(){
        document.getElementById('dscrape-ind').style.display = 'inline';
        this.amountOwned *= 2;
    },
    undouble: function(){
        document.getElementById('dscrape-ind').style.display = 'none';
        this.amountOwned /= 2;
    }
}

document.getElementById('back-owned').innerHTML = backhoe.amountOwned;
document.getElementById('dozer-owned').innerHTML = dozer.amountOwned;

function toggleDouble(button, whichEquip){
    if(button.classList.contains('unactive')){
        button.classList.remove('unactive');
        button.classList.add('active');
        let message;
        if(whichEquip == 'back'){
            backhoe.double();
            message = 'Undouble your backhoes.';
        }else if(whichEquip == 'dozer'){
            dozer.double();
            message = 'Undouble your dozers.';
        }else if(whichEquip == 'exca'){
            excavator.double();
            message = 'Undouble your excavators.';
        }else if(whichEquip == 'grade'){
            grader.double();
            message = 'Undouble your graders.';
        }else{
            scraper.double();
            message = 'Undouble your scrapers.';
        }
        button.innerHTML = 'DOUBLED'
        button.setAttribute('alt', message);

    }else{
        button.classList.remove('active');
        button.classList.add('unactive');
        if(whichEquip == 'back'){
            backhoe.undouble();
            message = 'Double your backhoes for this year.';
        }else if(whichEquip == 'dozer'){
            dozer.undouble();
            message = 'Double your dozers for this year.';
        }else if(whichEquip == 'exca'){
            excavator.undouble();
            message = 'Double your excavators for this year.';
        }else if(whichEquip == 'grade'){
            grader.undouble();
            message = 'Double your graders for this year.';
        }else{
            scraper.undouble();
            message = 'Double your scrapers for this year.';
        }
        button.innerHTML = 'DOUBLE'
        button.setAttribute('alt', message);
    }
}

function submitJob(){
    const jobEquip = document.getElementById('job-equip');
    const dice = document.getElementById('dice-roll');
    const expense = document.getElementById('job-expense');
    const equipForJob = jobEquip.value;
    const diceRoll = dice.value;
    const jobExpense = expense.value;
    let net;
    let gross = 0;
    switch(equipForJob){
        case 'back':
            if(backhoe.amountOwned > 0){
                net = diceRoll * backhoe.amountOwned * backhoe.base;
                if(net != 0){
                    gross = net - jobExpense;
                }
            }else{
                alertBox('You need at least one backhoe to do this job.')
                gross = 'error';
            }
            break;
        case 'dozer':
            if(dozer.amountOwned > 0){
                net = diceRoll * dozer.amountOwned * dozer.base;
                if(net != 0){
                    gross = net - jobExpense;
                }
            }else{
                alertBox('You need at least one dozer to do this job.')
                gross = 'error';
            }
            break;
        case 'exca':
            if(excavator.amountOwned > 0){
                net = diceRoll * excavator.amountOwned * excavator.base;
                if(net != 0){
                    gross = net - jobExpense;
                }
            }else{
                alertBox('You need at least one excavator to do this job.')
                gross = 'error';
            }
            break;
        case 'grade':
            if(grader.amountOwned > 0){
                net = diceRoll * grader.amountOwned * grader.base;
                if(net != 0){
                    gross = net - jobExpense;
                }
            }else{
                alertBox('You need at least one grader to do this job.')
                gross = 'error';
            }
            break;
        case 'scrape':
            if (scraper.amountOwned > 0){
                net = diceRoll * scraper.amountOwned * scraper.base;
                if(net != 0){
                    gross = net - jobExpense;
                }
            }else{
                alertBox('You need at least one scraper to do this job.')
                gross = 'error';
            }
            break;
    
    }
    
        if (Math.sign(gross) == -1){
            gross = gross.toString()
            addExpense(gross.slice(1), 'Job Loss');
        }else if (Math.sign(gross) == 1){
            addIncome(gross, 'Job Income');
        }else if (gross == 0){
            addIncome(0, 'Break Even')
        }else if(gross == 'error'){

        }
        jobEquip.value = 'back';
        dice.value = 1;
        expense.value = '';
    
}

function customIncome(){
    const input = document.getElementById('cust-inc-amount');
    let inputVal = input.value;
    if(inputVal.length > 0){
        addIncome(inputVal);
    }
    input.value = '';
}
function customExpense(){
    const input = document.getElementById('cust-exp-amount');
    let inputVal = input.value;
    if(inputVal.length > 0){
        addExpense(inputVal);
    }
    input.value = '';
}

localStorage.setItem('loanAmount', 0);
document.getElementById('current-amount').innerHTML = localStorage.getItem('loanAmount');
function addLoan(){
    const newAmount = document.getElementById('new-amount');
    let newAmountVal = Number(newAmount.value);
    const currentAmount = document.getElementById('current-amount');
    const loanAmount = Number(localStorage.getItem('loanAmount'));
    let result = loanAmount + newAmountVal;
    localStorage.setItem('loanAmount', result);
    currentAmount.innerHTML = commify(result);
    addIncome(newAmountVal, 'Loan');
    newAmount.value = 0;
}
function decreaseLoan(){
    const newAmount = document.getElementById('new-amount');
    let newAmountVal = Number(newAmount.value);
    const currentAmount = document.getElementById('current-amount');
    const loanAmount = Number(localStorage.getItem('loanAmount'));
    let result = loanAmount - newAmountVal;
    if(newAmountVal <= loanAmount + .01){
        localStorage.setItem('loanAmount', result);
        currentAmount.innerHTML = commify(result);
        addExpense(newAmountVal, 'Loan Payment');
        newAmount.value = 0;
    }
}

document.getElementById('dice-roll').addEventListener('input',
    () => {
        const diceNum = document.getElementById('dice-roll');
        const diceNumVal = Number(diceNum.value);
        if (diceNumVal < 1){
            diceNum.value = 1;
        }else if(diceNumVal > 12){
            diceNum.value = 12;
        }

    }
);
document.getElementById('cust-inc-amount').addEventListener('input',
    (evt) => {
        const customAmount = document.getElementById('cust-inc-amount');
        if (customAmount.value < 0 || evt.data == '-'){
            customAmount.value = '';
        }

    }
);
document.getElementById('cust-exp-amount').addEventListener('input',
    (evt) => {
        const customAmount = document.getElementById('cust-exp-amount');
        if (customAmount.value < 0 || evt.data == '-'){
            customAmount.value = '';
        }
    }
);
document.getElementById('new-amount').addEventListener('input',
    (evt) => {
        const customAmount = document.getElementById('new-amount');
        if (customAmount.value < 0 || evt.data == '-'){
            customAmount.value = '';
        }
    }
);

function alertBox(message){
    const alertEle = document.getElementById('alert-box');
    document.getElementById('alert-box').innerHTML = message;
    alertEle.style.top = '1%';
    setTimeout(() => {alertEle.style.top = '-10%';}, 3000)
}



