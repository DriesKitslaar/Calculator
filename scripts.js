let num1 = ""
let operation;
let num2 = ""
let display = '0';

const keys = document.querySelectorAll('.btn')
const buttons = document.getElementById('calculator')
const displayScreen = document.getElementById('display');
const div = document.querySelector('div')
const hiddenGif = document.getElementById('hiddenGif'); // reference to the hidden gif
const soundEffect = document.getElementById('soundEffect'); // reference to the sound effect

updateDisplay()


//handle operations
function operate(num1, operation, num2) {
    num1 = +num1
    num2 = +num2
    switch (operation) {
        case '+':
            return (num1 + num2).toFixed(2).toString();
        case '-':
            return (num1 - num2).toFixed(2).toString();
        case '×':
            return (num1 * num2).toFixed(2).toString();
        case '÷':
            if (num2 === 0) {
                hiddenGif.style.display = 'flex'
                soundEffect.play()
                return 'ALEEE JOENGE'
                // jumpscare toevoegen
            } else {
                return (num1/num2).toFixed(2).toString()
            }
    }
}


//handle number click
function updateNumbers(event) {
    if (operation) {
        if (num2.length <= 10) {
            num2 += event.target.textContent; //waar tf dient dit voor
            display = num2
        }
    }
    else {
        if (num1.length <= 10) {
            num1 += event.target.textContent;
            display = num1;
        }
    }
}

function backspace() {
    if (operation) {
        if (num2) {
            num2 = num2.slice(0,-1);
            display = num2
        }
        else {return;}
    }
    else {
        if (num1) {
            num1 = num1.slice(0,-1);
            display = 0
        }
    }
}

function flipSign() {
    if (operation) {
        if (num2) {
            num2 = (-(+num2)).toString()
            display = num2
        }
    }
    else {
        if (num1) {
            num1 = (-(num1)).toString()
            display = num1
        }
    }
}

//handle decimal button
function makeDecimal() {
    if (operation) {
        num2 = num2 ? num2 : '0';
        if (!(num2.includes('.'))) {
            num2 += '.';
            display= num2
        }
    }
    else {
        num1 = num1 ? num1 : '0';
        if (!(num1.includes('.'))) {
            num1 += '.';
            display = num1;
        }
    }
}

function updateDisplay() {
    if (display === 'ALEEE JOENGE') {
        displayScreen.textContent = display;
        return;
    }
    display = (+display).toString();
    if (display.length <= 11) {
        displayScreen.textContent = display;
    }
    else displayScreen.textContent = '＼（〇_ｏ）／'
}

function clear() {
    num1 = "";
    num2= "";
    display = '0';
    operation = null
    hiddenGif.style.display = 'none'; // hide the gif when cleared
    soundEffect.pause(); // stop the sound when cleared
    soundEffect.currentTime = 0; // reset sound to start
}

function update(event) {
    const targetClassList = event.target.classList;

    switch (true) {
        case targetClassList.contains('num'):
            updateNumbers(event);
            break;
        case targetClassList.contains('op'):
            if (!operation) {
                operation = event.target.textContent;

                if (!num1 && display !== '0') {
                    num1 = display;
                }
            } else {
                display = operate(num1, operation, num2);
                num1 = display;
                operation = event.target.textContent;
                num2 = "";
            }
            break;
        case targetClassList.contains('eq'):
            if (operation) {
                display = operate(num1, operation, num2);
                num1 = '';
                num2 = '';
                operation = null;
            }
            break;
        case targetClassList.contains('clear'):
            clear();
            break;
        case targetClassList.contains('backspace'):
            backspace();
            break;
        case targetClassList.contains('sign'):
            flipSign();
            break;
        case targetClassList.contains('dot'):
            makeDecimal();
            break;
    }

    updateDisplay();
}

buttons.addEventListener('click', update, true)

keys.forEach(key => {
    key.addEventListener("click", () => {
        key.style.borderTopColor = "#f6c2f3";
        key.style.borderLeftColor = "#f6c2f3";
        key.style.borderRightWidth = "2px";
        key.style.borderBottomWidth = "2px";

        setTimeout(() => {
            key.style.borderTopColor = "";
            key.style.borderLeftColor = "";
            key.style.borderRightWidth = "";
            key.style.borderBottomWidth = "";
        }, 150)
    });
});
