


function displayBalance(amount) {
    let result = 0;
    const total = document.getElementById('balance');
    result = Number(amount) + Number(sessionStorage.getItem('balance'));
    sessionStorage.setItem('balance', result);
    let rResult = commify(result);
    total.innerHTML = '$' + rResult;

}
function commify(res) {
    res = res.toString();
    let negative = false;
    let decimalPos;
    if (res.includes('.')) {
        for (let i = 0; i < res.length; i++) {
            if (res[i] == '.') {
                decimalPos = i;
            }
        }
        res = res.slice(0, decimalPos);
    }
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

        if (oddNums > 0 && !negative) { return res.slice(0, oddNums) + ',' + arr.toString() }
        else if (oddNums == 0 && !negative) { return arr.toString() }
        else if (oddNums > 0 && negative) { return '-' + res.slice(0, oddNums) + ',' + arr.toString() }
        else if (oddNums == 0 && negative) { return '-' + arr.toString() }
    }
    else { return res }
}

function addExpense(num, message = 'Misc') {
    const financeList = document.getElementById('money-list');
    financeList.innerHTML += '<li class="expense">$' + commify(num) + ' ' + message + '</li>';
    displayBalance('-' + num);
}
function addIncome(num, message = 'Misc') {
    const financeList = document.getElementById('money-list');
    financeList.innerHTML += '<li class="income">$' + commify(num) + ' ' + message + '</li>';
    displayBalance(num);
}

const backhoe = {
    amountOwned: 0,
    price: 50_000,
    base: 1_000,
    doubled: false,
    ownedInd: document.getElementById('back-owned'),
    buyOne: function () {
        if (this.doubled) {
            if (this.price <= sessionStorage.getItem('balance')) {
                this.amountOwned /= 2;
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(this.price, 'New Backhoe');
                this.amountOwned *= 2;
            } else {
                alertBox('You currently do not have enough money to buy a backhoe.');
            }
        } else {
            if (this.price <= sessionStorage.getItem('balance')) {
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(this.price, 'New Backhoe');
            } else {
                alertBox('You currently do not have enough money to buy a backhoe.');
            }
        }
        console.log(this.amountOwned)
    },
    sellOne: function (amount){
        if(this.amountOwned > 0){        
            if(this.doubled){
                this.amountOwned /= 2;
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Backhoe');
                this.amountOwned *= 2;
            }else{
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Backhoe');
            }
        }
    },
    double: function () {
        if (!this.doubled){
            document.getElementById('dback-ind').style.display = 'inline';
            this.amountOwned *= 2;
            this.doubled = true;
        }
        console.log(this.amountOwned)
    },
    undouble: function () {
        if(this.doubled){
            document.getElementById('dback-ind').style.display = 'none';
            this.amountOwned /= 2;
            this.doubled = false;
        }
        console.log(this.amountOwned)
    }
}
const dozer = {
    amountOwned: 0,
    price: 75_000,
    base: 2_000,
    doubled: false,
    ownedInd: document.getElementById('dozer-owned'),
    buyOne: function () {
        if (this.doubled) {
            if (this.price <= sessionStorage.getItem('balance')) {
                this.amountOwned /= 2;
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(this.price, 'New Dozer');
                this.amountOwned *= 2;
            } else {
                alertBox('You currently do not have enough money to buy a dozer.');
            }
        } else {
            if (this.price <= sessionStorage.getItem('balance')) {
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(this.price, 'New Dozer');
            } else {
                alertBox('You currently do not have enough money to buy a dozer.');
            }
        }
    },
    sellOne: function (amount){
        if(this.amountOwned > 0){        
            
            if(this.doubled){
                this.amountOwned /= 2;
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Dozer');
                this.amountOwned *= 2;
            }else{
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Dozer');
            }
        }
    },
    double: function () {
        document.getElementById('ddozer-ind').style.display = 'inline';
        this.amountOwned *= 2;
        this.doubled = true;
    },
    undouble: function () {
        document.getElementById('ddozer-ind').style.display = 'none';
        this.amountOwned /= 2;
        this.doubled = false;
    }
}
const excavator = {
    amountOwned: 0,
    price: 100_000,
    base: 3_000,
    doubled: false,
    ownedInd: document.getElementById('exca-owned'),
    buyOne: function () {
        if (this.doubled) {
            if (this.price <= sessionStorage.getItem('balance')) {
                this.amountOwned /= 2;
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(100_000, 'New Excavator');
                this.amountOwned *= 2;
            } else {
                alertBox('You currently do not have enough money to buy a excavator.');
            }
        } else {
            if (this.price <= sessionStorage.getItem('balance')) {
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(100_000, 'New Excavator');
            } else {
                alertBox('You currently do not have enough money to buy a excavator.');
            }
        }
    },
    sellOne: function (amount){
        if(this.amountOwned > 0){        
            if(this.doubled){
                this.amountOwned /= 2;
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Excavator');
                this.amountOwned *= 2;
            }else{
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Excavator');
            }
        }
    },
    double: function () {
        document.getElementById('dexca-ind').style.display = 'inline';
        this.amountOwned *= 2;
        this.doubled = true;
    },
    undouble: function () {
        document.getElementById('dexca-ind').style.display = 'none';
        this.amountOwned /= 2;
        this.doubled = false;
    }
}
const grader = {
    amountOwned: 0,
    price: 150_000,
    base: 5_000,
    doubled: false,
    ownedInd: document.getElementById('grade-owned'),
    buyOne: function () {
        if (this.doubled) {
            if (this.price <= sessionStorage.getItem('balance')) {
                this.amountOwned /= 2;
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(this.price, 'New Grader');
                this.amountOwned *= 2;
            } else {
                alertBox('You currently do not have enough money to buy a grader.');
            }
        } else {
            if (this.price <= sessionStorage.getItem('balance')) {
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(this.price, 'New Grader');
            } else {
                alertBox('You currently do not have enough money to buy a grader.');
            }
        }
    },
    sellOne: function (amount){
        if(this.amountOwned > 0){        
            if(this.doubled){
                this.amountOwned /= 2;
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Grader');
                this.amountOwned *= 2;
            }else{
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Grader');
            }
        }
    },
    double: function () {
        document.getElementById('dgrade-ind').style.display = 'inline';
        this.amountOwned *= 2;
        this.doubled = true;
    },
    undouble: function () {
        document.getElementById('dgrade-ind').style.display = 'none';
        this.amountOwned /= 2;
        this.doubled = false;
    }

}
const scraper = {
    amountOwned: 0,
    price: 200_000,
    base: 7_000,
    doubled: false,
    ownedInd: document.getElementById('scrape-owned'),
    buyOne: function () {
        if (this.doubled) {
            if (this.price <= sessionStorage.getItem('balance')) {
                this.amountOwned /= 2;
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(this.price, 'New Scraper');
                this.amountOwned *= 2;
            } else {
                alertBox('You currently do not have enough money to buy a scraper.');
            }
        } else {
            if (this.price <= sessionStorage.getItem('balance')) {
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(this.price, 'New Scraper');
            } else {
                alertBox('You currently do not have enough money to buy a scraper.');
            }
        }
    },
    sellOne: function (amount){
        if(this.amountOwned > 0){        
            if(this.doubled){
                this.amountOwned /= 2;
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Scraper');
                this.amountOwned *= 2;
            }else{
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Scraper');
            }
        }
    },
    double: function () {
        document.getElementById('dscrape-ind').style.display = 'inline';
        this.amountOwned *= 2;
        this.doubled = true;
    },
    undouble: function () {
        document.getElementById('dscrape-ind').style.display = 'none';
        this.amountOwned /= 2;
        this.doubled = false;
    }
}


function toggleDouble(button, whichEquip) {
    if (button.classList.contains('unactive')) {
        button.classList.remove('unactive');
        button.classList.add('active');
        let message;
        if (whichEquip == 'back') {
            backhoe.double();
            message = 'Undouble your backhoes.';
        } else if (whichEquip == 'dozer') {
            dozer.double();
            message = 'Undouble your dozers.';
        } else if (whichEquip == 'exca') {
            excavator.double();
            message = 'Undouble your excavators.';
        } else if (whichEquip == 'grade') {
            grader.double();
            message = 'Undouble your graders.';
        } else {
            scraper.double();
            message = 'Undouble your scrapers.';
        }
        button.innerHTML = 'DOUBLED'
        button.setAttribute('alt', message);

    } else {
        button.classList.remove('active');
        button.classList.add('unactive');
        if (whichEquip == 'back') {
            backhoe.undouble();
            message = 'Double your backhoes for this year.';
        } else if (whichEquip == 'dozer') {
            dozer.undouble();
            message = 'Double your dozers for this year.';
        } else if (whichEquip == 'exca') {
            excavator.undouble();
            message = 'Double your excavators for this year.';
        } else if (whichEquip == 'grade') {
            grader.undouble();
            message = 'Double your graders for this year.';
        } else {
            scraper.undouble();
            message = 'Double your scrapers for this year.';
        }
        button.innerHTML = 'DOUBLE'
        button.setAttribute('alt', message);
    }
}

function submitJob() {
    const jobEquip = document.getElementById('job-equip');
    const dice = document.getElementById('dice-roll');
    const expense = document.getElementById('job-expense');
    const equipForJob = jobEquip.value;
    const diceRoll = dice.value;
    const jobExpense = expense.value;
    let net;
    let gross = 0;
    switch (equipForJob) {
        case 'back':
            if (backhoe.amountOwned > 0) {
                net = diceRoll * backhoe.amountOwned * backhoe.base;
                if (net != 0) {
                    gross = net - jobExpense;
                }
            } else {
                alertBox('You need at least one backhoe to do this job.')
                gross = 'error';
            }
            break;
        case 'dozer':
            if (dozer.amountOwned > 0) {
                net = diceRoll * dozer.amountOwned * dozer.base;
                if (net != 0) {
                    gross = net - jobExpense;
                }
            } else {
                alertBox('You need at least one dozer to do this job.')
                gross = 'error';
            }
            break;
        case 'exca':
            if (excavator.amountOwned > 0) {
                net = diceRoll * excavator.amountOwned * excavator.base;
                if (net != 0) {
                    gross = net - jobExpense;
                }
            } else {
                alertBox('You need at least one excavator to do this job.')
                gross = 'error';
            }
            break;
        case 'grade':
            if (grader.amountOwned > 0) {
                net = diceRoll * grader.amountOwned * grader.base;
                if (net != 0) {
                    gross = net - jobExpense;
                }
            } else {
                alertBox('You need at least one grader to do this job.')
                gross = 'error';
            }
            break;
        case 'scrape':
            if (scraper.amountOwned > 0) {
                net = diceRoll * scraper.amountOwned * scraper.base;
                if (net != 0) {
                    gross = net - jobExpense;
                }
            } else {
                alertBox('You need at least one scraper to do this job.')
                gross = 'error';
            }
            break;

    }

    if (Math.sign(gross) == -1) {
        gross = gross.toString()
        addExpense(gross.slice(1), 'Job Loss');
    } else if (Math.sign(gross) == 1) {
        addIncome(gross, 'Job Income');
    } else if (gross == 0) {
        addIncome(0, 'Break Even')
    } else if (gross == 'error') {

    }
    jobEquip.value = 'back';
    dice.value = 1;
    expense.value = '';

}

function customIncome() {
    const input = document.getElementById('cust-inc-amount');
    let inputVal = input.value;
    if (inputVal > 0) {
        addIncome(inputVal);
    }
    input.value = '';
}
function customExpense() {
    const input = document.getElementById('cust-exp-amount');
    let inputVal = input.value;
    if (inputVal > 0) {
        addExpense(inputVal);
    }
    input.value = '';
}

function addLoan() {
    const newAmount = document.getElementById('new-amount');
    let newAmountVal = Number(newAmount.value);
    const currentAmount = document.getElementById('current-amount');
    const loanAmount = Number(sessionStorage.getItem('loanAmount'));
    if (newAmountVal > 0) {
        let result = loanAmount + newAmountVal;
        sessionStorage.setItem('loanAmount', result);
        currentAmount.innerHTML = commify(result);
        addIncome(newAmountVal, 'Loan');
        newAmount.value = '';
    }
}
function decreaseLoan() {
    const newAmount = document.getElementById('new-amount');
    let newAmountVal = Number(newAmount.value);
    const currentAmount = document.getElementById('current-amount');
    const loanAmount = Number(sessionStorage.getItem('loanAmount'));
    if (newAmountVal > 0) {
        let result = loanAmount - newAmountVal;
        if (newAmountVal <= loanAmount + .01) {
            sessionStorage.setItem('loanAmount', result);
            currentAmount.innerHTML = commify(result);
            addExpense(newAmountVal, 'Loan Payment');
            newAmount.value = '';
        }
    }
}

function sellEquip(){
    const sellAmount = document.getElementById('sell-amount');
    let sellAmountVal = Number(sellAmount.value);
    const whichSell = document.getElementById('sell-select').value;
    if (sellAmountVal > 0){
        switch (whichSell){ 
            case 'sell-back':
                backhoe.sellOne(sellAmountVal);
                break;
            case 'sell-dozer':
                dozer.sellOne(sellAmountVal);
                break;
            case 'sell-exca':
                excavator.sellOne(sellAmountVal);
                break;
            case 'sell-grade':
                grader.sellOne(sellAmountVal);
                break;
            case 'sell-scrape':
                scraper.sellOne(sellAmountVal);
                break;

        }
    }
    
    document.getElementById('sell-select').value = 'sell-back';
    sellAmount.value = 50_000;
    
}

document.getElementById('dice-roll').addEventListener('input',
    () => {
        const diceNum = document.getElementById('dice-roll');
        const diceNumVal = Number(diceNum.value);
        if (diceNumVal < 1) {
            diceNum.value = 1;
        } else if (diceNumVal > 12) {
            diceNum.value = 12;
        }

    }
);
document.getElementById('cust-inc-amount').addEventListener('input',
    (evt) => {
        const customAmount = document.getElementById('cust-inc-amount');
        if (customAmount.value < 0 || evt.data == '-') {
            customAmount.value = '';
        }

    }
);
document.getElementById('cust-exp-amount').addEventListener('input',
    (evt) => {
        const customAmount = document.getElementById('cust-exp-amount');
        if (customAmount.value < 0 || evt.data == '-') {
            customAmount.value = '';
        }
    }
);
document.getElementById('new-amount').addEventListener('input',
    (evt) => {
        const customAmount = document.getElementById('new-amount');
        if (customAmount.value < 0 || evt.data == '-') {
            customAmount.value = '';
        }
    }
);
document.getElementById('job-expense').addEventListener('input',
    (evt) => {
        const customAmount = document.getElementById('job-expense');
        if (customAmount.value < 0 || evt.data == '-') {
            customAmount.value = '';
        }
    }
);
document.getElementById('sell-amount').addEventListener('input',
    (evt) => {
        const customAmount = document.getElementById('sell-amount');
        if (customAmount.value < 0 || evt.data == '-') {
            customAmount.value = '';
        }
    }
);

function changeDefault(x){
    const sellInput = document.getElementById('sell-amount');
    switch (x){
        case 'sell-back':
            sellInput.value = backhoe.price;
            break;
        case 'sell-dozer':
            sellInput.value = dozer.price;
            break;
        case 'sell-exca':
            sellInput.value = excavator.price;
            break;
        case 'sell-grade':
            sellInput.value = grader.price;
            break;
        case 'sell-scrape':
            sellInput.value = scraper.price;
            break;
    }
}

function alertBox(message) {
    const alertEle = document.getElementById('alert-box');
    document.getElementById('alert-box').innerHTML = message;
    alertEle.style.top = '1%';
    setTimeout(() => { alertEle.style.top = '-10%'; }, 3000)
}

function newGame() {
    sessionStorage.clear();
    sessionStorage.setItem('balance', 0);
    sessionStorage.setItem('loanAmount', 0);
    document.getElementById('current-amount').innerHTML = sessionStorage.getItem('loanAmount');
    if(backhoe.doubled){
        toggleDouble(document.getElementsByClassName('back')[0].getElementsByTagName('button')[0], 'back')
    }
    if(dozer.doubled){
        toggleDouble(document.getElementsByClassName('dozer')[0].getElementsByTagName('button')[0], 'dozer')
    }
    if(excavator.doubled){
        toggleDouble(document.getElementsByClassName('exca')[0].getElementsByTagName('button')[0], 'exca')
    }
    if(grader.doubled){
        toggleDouble(document.getElementsByClassName('grade')[0].getElementsByTagName('button')[0], 'grade')
    }
    if(scraper.doubled){
        toggleDouble(document.getElementsByClassName('scrape')[0].getElementsByTagName('button')[0], 'scrape')
    }
    backhoe.amountOwned = 2;
    dozer.amountOwned = 1;
    excavator.amountOwned = 0;
    grader.amountOwned = 0;
    scraper.amountOwned = 0;
    document.getElementById('back-owned').innerHTML = backhoe.amountOwned;
    document.getElementById('dozer-owned').innerHTML = dozer.amountOwned;
    document.getElementById('exca-owned').innerHTML = excavator.amountOwned;
    document.getElementById('grade-owned').innerHTML = grader.amountOwned;
    document.getElementById('scrape-owned').innerHTML = scraper.amountOwned;
    document.getElementById('money-list').innerHTML = '';
    document.getElementById('sell-select').value = 'sell-back';
    document.getElementById('sell-amount').value = 50_000;
    document.getElementById('dice-roll').value = 1;
    document.getElementById('new-amount').value = '';
    document.getElementById('job-expense').value = '';
    document.getElementById('cust-inc-amount').value = '';
    document.getElementById('cust-exp-amount').value = '';
    document.getElementById('job-equip').value = 'back';
    addIncome(100_000_000, 'Game Start');
}


if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)){
    document.body.style.overflow = 'hidden';
    document.getElementById('mobile').style.display = 'block';
}

function saveGame(){
  
    const gameInfo = {
        balance: sessionStorage.getItem('balance'),
        loanAmount: sessionStorage.getItem('loanAmount'),
        
        

        
        backDub: backhoe.doubled,
        dozerDub: dozer.doubled,
        excaDub: excavator.doubled,
        gradeDub: grader.doubled,
        scrapeDub: scraper.doubled, 

        backOwned:  backhoe.amountOwned,
        dozerOwned: dozer.amountOwned,
        excaOwned:  excavator.amountOwned,
        gradeOwned: grader.amountOwned,
        scrapeOwned: scraper.amountOwned,
    }
    if (backhoe.doubled){
        gameInfo.backOwned = backhoe.amountOwned / 2;
    }
    if (dozer.doubled){
        gameInfo.dozerOwned = dozer.amountOwned / 2;
    }
    if (excavator.doubled){
        gameInfo.excaOwned = excavator.amountOwned / 2;
    }
    if (grader.doubled){
        gameInfo.gradeOwned = grader.amountOwned / 2;
    }
    if (scraper.doubled){
        gameInfo.scrapeOwned = scraper.amountOwned / 2;
    }
    


    localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
    alertBox('Game Saved');
    console.log(backhoe.amountOwned)
}

function loadGame(){
    const gameInfo = JSON.parse(localStorage.getItem('gameInfo'));
    console.log(gameInfo);
    newGame()
    
    backhoe.amountOwned = gameInfo.backOwned;
    backhoe.ownedInd.innerHTML = gameInfo.backOwned;
    
    dozer.amountOwned = gameInfo.dozerOwned;
    dozer.ownedInd.innerHTML = gameInfo.dozerOwned;
    
    excavator.amountOwned = gameInfo.excaOwned;
    excavator.ownedInd.innerHTML = gameInfo.excaOwned;
    
    grader.amountOwned = gameInfo.gradeOwned;
    grader.ownedInd.innerHTML = gameInfo.gradeOwned;
    
    scraper.amountOwned = gameInfo.scrapeOwned;
    scraper.ownedInd.innerHTML = gameInfo.scrapeOwned;
    
    if(gameInfo.backDub){
        toggleDouble(document.getElementsByClassName('back')[0].getElementsByTagName('button')[0], 'back')
    }
    if(gameInfo.dozerDub){
        toggleDouble(document.getElementsByClassName('dozer')[0].getElementsByTagName('button')[0], 'dozer')
    }
    if(gameInfo.excaDub){
        toggleDouble(document.getElementsByClassName('exca')[0].getElementsByTagName('button')[0], 'exca')
    }
    if(gameInfo.gradeDub){
        toggleDouble(document.getElementsByClassName('grade')[0].getElementsByTagName('button')[0], 'grade')
    }
    if(gameInfo.scrapeDub){
        toggleDouble(document.getElementsByClassName('scrape')[0].getElementsByTagName('button')[0], 'scrape')
    }

    sessionStorage.setItem('balance', 0);
    document.getElementById('money-list').innerHTML = '';
    addIncome(gameInfo.balance, 'Loaded Balance');
    sessionStorage.setItem('loanAmount', gameInfo.loanAmount);
    document.getElementById('current-amount').innerHTML = commify(gameInfo.loanAmount);
    alertBox('Last Save Loaded');
}

// function checkIfSaved(){
//     const gameInfo = JSON.parse(localStorage.getItem('gameInfo'));

// }
newGame();

// const gameInfo = {
//     balance: sessionStorage.getItem('balance'),
//     loanAmount: sessionStorage.getItem('loanAmount'),
  
//     backDub: backhoe.doubled,
//     dozerDub: dozer.doubled,
//     excaDub: excavator.doubled,
//     gradeDub: grader.doubled,
//     scrapeDub: scraper.doubled, 

//     backOwned:  backhoe.amountOwned,
//     dozerOwned: dozer.amountOwned,
//     excaOwned:  excavator.amountOwned,
//     gradeOwned: grader.amountOwned,
//     scrapeOwned: scraper.amountOwned,
// }