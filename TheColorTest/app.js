const colors = ["Red", "Green", "Blue", "Orange", "Yellow", 
                "Black", "White", "Purple", "Pink", "Brown"];
let currentColor = "";
let colorText = {}, body = {}, buttons = [], score = {}, time = {};
let scoreAmount = 0;
let seconds = 0;

window.onload = () => {
    body = document.body;
    colorText = document.getElementById("ColorText");
    buttons.push(document.getElementById("Button1"));
    buttons.push(document.getElementById("Button2"));
    buttons.push(document.getElementById("Button3"));
    buttons.push(document.getElementById("Button4"));
    score = document.getElementById("Score");
    time = document.getElementById("Time");

    buttonIndices = Object.keys(buttons);

    colorText.onclick = () => {
        NewColor();
        colorText.onclick = null;
        setTimeout(() => {
            Timer();
        }, 1000);
    };
}

function NewColor() {
    let correctColorIndex = Math.floor(Math.random() * colors.length);
    let textColorIndex = Math.floor(Math.random() * colors.length);
    let incorrectBackgroundColorIndex = Math.floor(Math.random() * colors.length);
    let correctButton = Math.floor(Math.random() * 4);

    currentColor = colors[correctColorIndex];

    while (correctColorIndex == textColorIndex)
        textColorIndex = Math.floor(Math.random() * colors.length);
    
    while (correctColorIndex == incorrectBackgroundColorIndex)
        incorrectBackgroundColorIndex = Math.floor(Math.random() * colors.length);

    colorText.innerHTML = colors[textColorIndex];
    colorText.style.color = colors[correctColorIndex];
    body.style.backgroundColor = colors[incorrectBackgroundColorIndex];

    for (let i = 0; i < buttons.length; i++) {
        const elem = buttons[i];
        if (i == correctButton)
            elem.innerHTML = colors[correctColorIndex];
        else {
            let incorrectAnswer = Math.floor(Math.random() * colors.length);
            while (incorrectAnswer == correctColorIndex)
                incorrectAnswer = Math.floor(Math.random() * colors.length);
            
                elem.innerHTML = colors[incorrectAnswer];
        }
    }
}

function CheckAnswer(obj) {
    console.log(obj.innerHTML);
    if (obj.innerHTML == currentColor)
        scoreAmount++;
    score.innerHTML = scoreAmount;
    NewColor();
}

function Timer() {
    seconds += 1

    let textSeconds = seconds % 60;
    let textMinutes = Math.floor(seconds / 60);

    if (textSeconds < 10) textSeconds = "0" + textSeconds;
    if (textMinutes < 10) textMinutes = "0" + textMinutes;

    time.innerHTML = `${textMinutes}:${textSeconds}`;

    setTimeout(() => {
        Timer();
    }, 1000);
}