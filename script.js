


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
    buyOne: function (price) {
        price = (price) ? price : this.price;
        if (this.doubled) {
            if (price <= sessionStorage.getItem('balance')) {
                this.amountOwned /= 2;
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(price, 'New Backhoe');
                this.amountOwned *= 2;
            } else {
                alertBox('You currently do not have enough money to buy a backhoe.');
            }
        } else {
            if (price <= sessionStorage.getItem('balance')) {
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(price, 'New Backhoe');
            } else {
                alertBox('You currently do not have enough money to buy a backhoe.');
            }
        }
    },
    sellOne: function (amount) {
        if (this.amountOwned > 0) {
            if (this.doubled) {
                this.amountOwned /= 2;
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Backhoe');
                this.amountOwned *= 2;
            } else {
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Backhoe');
            }
        }
    },
    double: function () {
        if (!this.doubled) {
            document.getElementById('dback-ind').style.display = 'inline';
            this.amountOwned *= 2;
            this.doubled = true;
        }
    },
    undouble: function () {
        if (this.doubled) {
            document.getElementById('dback-ind').style.display = 'none';
            this.amountOwned /= 2;
            this.doubled = false;
        }
    }
}
const dozer = {
    amountOwned: 0,
    price: 75_000,
    base: 2_000,
    doubled: false,
    ownedInd: document.getElementById('dozer-owned'),
    buyOne: function (price = this.price) {
        price = (price) ? price : this.price;
        if (this.doubled) {
            if (price <= sessionStorage.getItem('balance')) {
                this.amountOwned /= 2;
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(price, 'New Dozer');
                this.amountOwned *= 2;
            } else {
                alertBox('You currently do not have enough money to buy a dozer.');
            }
        } else {
            if (price <= sessionStorage.getItem('balance')) {
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(price, 'New Dozer');
            } else {
                alertBox('You currently do not have enough money to buy a dozer.');
            }
        }
    },
    sellOne: function (amount) {
        if (this.amountOwned > 0) {

            if (this.doubled) {
                this.amountOwned /= 2;
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Dozer');
                this.amountOwned *= 2;
            } else {
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
    buyOne: function (price = this.price) {
        price = (price) ? price : this.price;
        if (this.doubled) {
            if (price <= sessionStorage.getItem('balance')) {
                this.amountOwned /= 2;
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(price, 'New Excavator');
                this.amountOwned *= 2;
            } else {
                alertBox('You currently do not have enough money to buy a excavator.');
            }
        } else {
            if (price <= sessionStorage.getItem('balance')) {
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(price, 'New Excavator');
            } else {
                alertBox('You currently do not have enough money to buy a excavator.');
            }
        }
    },
    sellOne: function (amount) {
        if (this.amountOwned > 0) {
            if (this.doubled) {
                this.amountOwned /= 2;
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Excavator');
                this.amountOwned *= 2;
            } else {
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
    buyOne: function (price = this.price) {
        price = (price) ? price : this.price;
        if (this.doubled) {
            if (price <= sessionStorage.getItem('balance')) {
                this.amountOwned /= 2;
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(price, 'New Grader');
                this.amountOwned *= 2;
            } else {
                alertBox('You currently do not have enough money to buy a grader.');
            }
        } else {
            if (price <= sessionStorage.getItem('balance')) {
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(price, 'New Grader');
            } else {
                alertBox('You currently do not have enough money to buy a grader.');
            }
        }
    },
    sellOne: function (amount) {
        if (this.amountOwned > 0) {
            if (this.doubled) {
                this.amountOwned /= 2;
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Grader');
                this.amountOwned *= 2;
            } else {
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
    buyOne: function (price = this.price) {
        price = (price) ? price : this.price;
        if (this.doubled) {
            if (price <= sessionStorage.getItem('balance')) {
                this.amountOwned /= 2;
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(price, 'New Scraper');
                this.amountOwned *= 2;
            } else {
                alertBox('You currently do not have enough money to buy a scraper.');
            }
        } else {
            if (price <= sessionStorage.getItem('balance')) {
                this.amountOwned += 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addExpense(price, 'New Scraper');
            } else {
                alertBox('You currently do not have enough money to buy a scraper.');
            }
        }
    },
    sellOne: function (amount) {
        if (this.amountOwned > 0) {
            if (this.doubled) {
                this.amountOwned /= 2;
                this.amountOwned -= 1;
                this.ownedInd.innerHTML = this.amountOwned;
                addIncome(amount, 'Sold Scraper');
                this.amountOwned *= 2;
            } else {
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
    jobEquip.style.backgroundColor = 'rgba(229, 185, 9, 0.6)';
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

function sellEquip() {
    const sellAmount = document.getElementById('sell-amount');
    let sellAmountVal = Number(sellAmount.value);
    const whichSell = document.getElementById('sell-select').value;
    if (sellAmountVal > 0) {
        switch (whichSell) {
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
    document.getElementById('sell-select').style.backgroundColor = 'rgba(229, 185, 9, 0.6)';
    sellAmount.value = 50_000;

}
function buyEquip() {
    const sellAmount = document.getElementById('sell-amount');
    let sellAmountVal = Number(sellAmount.value);
    const whichSell = document.getElementById('sell-select').value;
    if (sellAmountVal > 0) {
        switch (whichSell) {
            case 'sell-back':
                backhoe.buyOne(sellAmountVal);
                break;
            case 'sell-dozer':
                dozer.buyOne(sellAmountVal);
                break;
            case 'sell-exca':
                excavator.buyOne(sellAmountVal);
                break;
            case 'sell-grade':
                grader.buyOne(sellAmountVal);
                break;
            case 'sell-scrape':
                scraper.buyOne(sellAmountVal);
                break;

        }
    }

    document.getElementById('sell-select').value = 'sell-back';
    document.getElementById('sell-select').style.backgroundColor = 'rgba(229, 185, 9, 0.6)';
    sellAmount.value = 50_000;

}

document.getElementById('dice-roll').addEventListener('input',
    () => {
        const diceNum = document.getElementById('dice-roll');
        const diceNumVal = Number(diceNum.value);
        if (diceNumVal < 1) {
            diceNum.value = 1;
        } else if (diceNumVal > 6) {
            diceNum.value = 6;
        }

    }
);

const sections = document.getElementsByClassName('sect');
for (let x = 0; x < sections.length; x++) {
    const numInputs = sections[x].getElementsByTagName('input');
    for (let y = 0; y < numInputs.length; y++) {
        numInputs[y].addEventListener('input',
            (evt) => {
                if (numInputs[y].value < 0 || evt.data == '-') {
                    numInputs[y].value = '';
                }
            })
    }
}
function changeDefaultSell(x) {
    const sellInput = document.getElementById('sell-amount');
    switch (x.value) {
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

function changeColor(x){
    switch (x.value){
        case 'back': 
        case 'sell-back':
            x.style.backgroundColor = 'rgba(229, 185, 9, 0.6)';
            break;
        case 'dozer': 
        case'sell-dozer':
            x.style.backgroundColor = 'rgba(107, 133, 72, 0.6)';
            break;
        case 'exca': 
        case 'sell-exca':
            x.style.backgroundColor = 'rgba(197, 43, 31, 0.6)';
            break;
        case 'grade': 
        case 'sell-grade':
            x.style.backgroundColor = 'rgba(69, 122, 166, 0.6)';
            break;
        case 'scrape': 
        case 'sell-scrape':
            x.style.backgroundColor = 'rgba(92, 42, 79, 0.6)';
            break;
    }
}

function alertBox(message) {
    const alertEle = document.getElementById('alert-box');
    alertEle.innerHTML = message;
    alertEle.style.top = '1%';
    setTimeout(() => { alertEle.style.top = '-10%'; }, 3000)
}

function newGame() {
    sessionStorage.clear();
    sessionStorage.setItem('balance', 0);
    sessionStorage.setItem('loanAmount', 0);
    document.getElementById('current-amount').innerHTML = sessionStorage.getItem('loanAmount');
    if (backhoe.doubled) {
        toggleDouble(document.getElementsByClassName('back')[0].getElementsByTagName('button')[0], 'back')
    }
    if (dozer.doubled) {
        toggleDouble(document.getElementsByClassName('dozer')[0].getElementsByTagName('button')[0], 'dozer')
    }
    if (excavator.doubled) {
        toggleDouble(document.getElementsByClassName('exca')[0].getElementsByTagName('button')[0], 'exca')
    }
    if (grader.doubled) {
        toggleDouble(document.getElementsByClassName('grade')[0].getElementsByTagName('button')[0], 'grade')
    }
    if (scraper.doubled) {
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
    document.getElementById('sell-select').style.backgroundColor = 'rgba(229, 185, 9, 0.6)';
    document.getElementById('sell-amount').value = 50_000;
    document.getElementById('dice-roll').value = 1;
    document.getElementById('new-amount').value = '';
    document.getElementById('job-expense').value = '';
    document.getElementById('cust-inc-amount').value = '';
    document.getElementById('cust-exp-amount').value = '';
    document.getElementById('job-equip').value = 'back';
    document.getElementById('job-equip').style.backgroundColor = 'rgba(229, 185, 9, 0.6)';

    addIncome(100_000, 'Game Start');
}


if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.body.style.overflow = 'hidden';
    document.getElementById('mobile').style.display = 'block';
}

function saveGame() {
    document.getElementById('save-game').style.backgroundColor = 'rgb(210, 210, 202)';
    ;
    const gameInfo = {
        balance: sessionStorage.getItem('balance'),
        loanAmount: sessionStorage.getItem('loanAmount'),

        moneyList: document.getElementById('money-list').innerHTML,


        backDub: backhoe.doubled,
        dozerDub: dozer.doubled,
        excaDub: excavator.doubled,
        gradeDub: grader.doubled,
        scrapeDub: scraper.doubled,

        backOwned: backhoe.amountOwned,
        dozerOwned: dozer.amountOwned,
        excaOwned: excavator.amountOwned,
        gradeOwned: grader.amountOwned,
        scrapeOwned: scraper.amountOwned,
    }
    if (backhoe.doubled) {
        gameInfo.backOwned = backhoe.amountOwned / 2;
    }
    if (dozer.doubled) {
        gameInfo.dozerOwned = dozer.amountOwned / 2;
    }
    if (excavator.doubled) {
        gameInfo.excaOwned = excavator.amountOwned / 2;
    }
    if (grader.doubled) {
        gameInfo.gradeOwned = grader.amountOwned / 2;
    }
    if (scraper.doubled) {
        gameInfo.scrapeOwned = scraper.amountOwned / 2;
    }
    
    loadAnimation()
    localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
    console.log('Game Save: ' + gameInfo)
}

function loadGame() {
    const gameInfo = JSON.parse(localStorage.getItem('gameInfo'));
    console.log('Game Load: ' + gameInfo);
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

    if (gameInfo.backDub) {
        toggleDouble(document.getElementsByClassName('back')[0].getElementsByTagName('button')[0], 'back')
    }
    if (gameInfo.dozerDub) {
        toggleDouble(document.getElementsByClassName('dozer')[0].getElementsByTagName('button')[0], 'dozer')
    }
    if (gameInfo.excaDub) {
        toggleDouble(document.getElementsByClassName('exca')[0].getElementsByTagName('button')[0], 'exca')
    }
    if (gameInfo.gradeDub) {
        toggleDouble(document.getElementsByClassName('grade')[0].getElementsByTagName('button')[0], 'grade')
    }
    if (gameInfo.scrapeDub) {
        toggleDouble(document.getElementsByClassName('scrape')[0].getElementsByTagName('button')[0], 'scrape')
    }

    sessionStorage.setItem('balance', 0);
    document.getElementById('money-list').innerHTML = gameInfo.moneyList;
    displayBalance(gameInfo.balance);
    sessionStorage.setItem('loanAmount', gameInfo.loanAmount);
    document.getElementById('current-amount').innerHTML = commify(gameInfo.loanAmount);
    alertBox('Last Save Loaded');
}

const buyBtns = document.getElementsByClassName('buy-button');
for (let i = 0; i < buyBtns.length; i++) {
    buyBtns[i].addEventListener('click', unsaved);
}
const dubBtns = document.getElementsByClassName('double');
for (let i = 0; i < dubBtns.length; i++) {
    dubBtns[i].addEventListener('click', unsaved);
}
function unsaved() {
    let unsavedColor = 'rgb(201, 120, 133)';
    document.getElementById('save-game').style.backgroundColor = unsavedColor;
}
let autoInt;
function autoSave(btn){ 
    if(btn.classList.contains('auto-off')){
        btn.classList.remove('auto-off');
        btn.classList.add('auto-on');
        autoInt = setInterval(() => {
            saveGame()
            loadAnimation();
        }, 120000)
    }else{
        btn.classList.remove('auto-on');
        btn.classList.add('auto-off');
        clearInterval(autoInt)
    }
}
function loadAnimation(){
    const sym = document.getElementById('loading');
    sym.style.display = 'inline';
    let e = 0;
    const int = setInterval(() => {
        if (e >= 360){
            clearInterval(int);
            sym.style.display = 'none';
            alertBox('Game Saved');
            e = 0;
        }
        sym.style.rotate = e + 'deg';
        e += 5;
    }, 20)


}
newGame();




