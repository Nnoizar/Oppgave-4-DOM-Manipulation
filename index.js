/* 
flipcard game

-1: lage en divcontainer
-2 appende med ul, li med bilder som innhold i en grid på 3, totalt 12 bilder. totalt 6 par med bilder
-3 gå gjennom arrayet og sette inn et random bilde fra arrayet i tur og orden
-4 lage flipp i css
-5 sjekke om kortene er like, hvis ikke flipp tilbake
*/

//legger samme bildene inn 2 ganger siden jeg trenger bildene i par
const imgArr = [
    "card1.jpg",
    "card2.jpg",
    "card3.jpg",
    "card4.jpg",
    "card5.jpg",
    "card6.jpg",
    "card1.jpg",
    "card2.jpg",
    "card3.jpg",
    "card4.jpg",
    "card5.jpg",
    "card6.jpg"
]
//lagrer mine unike tilfeldig genererte tall 
const uniqueNumbers = [];

while (uniqueNumbers.length < 12) {  // fyller inn arrayet helt til vi har fyllt alle indexene med tall
    let randomNum = Math.floor(Math.random() * 12);//laget et random tall

    // sjekker om arrayet uniqueNumbers !IKKE inkluderer det random tallet vi har laget i den gjeldene itterasjonen
    if (!uniqueNumbers.includes(randomNum)) {
        uniqueNumbers.push(randomNum);
    }
}

/*************************************************************** */
// Lager et nytt objekt med random tall fra uniqueNumbers arrayet som keys, og parer dem med bildenavnet fra imgArr som value
let randomImg = {};
for (let i = 0; i < imgArr.length; i++) {
    randomImg[uniqueNumbers[i]] = imgArr[i];
}
/*************************************************************** */

//lager en div med id container som blir mastercontainerog legger til
const masterContainer = document.createElement("div")
masterContainer.classList.add("masterContainer")
document.body.append(masterContainer)
//div med game info, score og retry
const gameInfo = document.createElement("div")
const score = document.createElement("h1")
const button = document.createElement("button")

score.setAttribute("id", "score")
gameInfo.setAttribute("id", "gameInfo")
button.textContent = "Reset the current game"
score.textContent = "amount of tryes:"

gameInfo.append(button)
gameInfo.append(score)
document.body.prepend(gameInfo)


//lager struktur med diver for hvert kort
function createCardStructure(imageIndex) {
    const cardContainer = document.createElement("div")
    const cardContent = document.createElement("div")
    const cardFront = document.createElement("div")
    const cardBack = document.createElement("div")
    const imgEl = document.createElement("img")
    const txtEl = document.createElement("h3")
    //legger til classenavn

    cardContainer.classList.add("cardContainer")
    cardContent.classList.add("cardContent")
    cardFront.classList.add("cardFront")
    cardBack.classList.add("cardBack")

    //får tak i img indexen fra funksjonen og setter value som url
    imgEl.src = `./assets/${randomImg[imageIndex]}`
    //appender alt inni master container
    cardContainer.append(cardContent)
    cardContent.append(cardFront)
    cardFront.append(txtEl.textContent = "Click to flip")
    cardBack.append(imgEl)
    cardContent.append(cardBack)
    masterContainer.append(cardContainer)
    cardContainer.addEventListener("click", flipCard);
}


//lager en løkke som kaller på createCardStructure 12 ganger
for (let i = 0; i < 12; i++) {
    createCardStructure(i)
}

//lager globale variabler for sjekke videre i koden senere
let firstCard = null; //signaliserer tomhet, falsy value
let secondCard = null;//signaliserer tomhet, falsy value
let lockBoard = false;

//kaller på denne funksjonen via eventlistener "click"
function flipCard() {

    switch (true) {
        //hvis lockboard === true kjør case og hopp ut av switch og funksjonen
        case (lockBoard): {
            return
        }
        //hvis kortet jeg har klikket på alerede inneholder klassen flipped, return
        case (this.classList.contains("flipped")): {
            return
        }
        case (!firstCard): {//når FirstCard ikke er truthy er casen true
            //Før vi trykker på vårt første kort så er firstCard verdien satt til null som er falsy value og ! konverterer verdien i variabelen til boolean og flipper den (vi må flippe siden casesn har true som forventning, og siden vi vil at not true skal møte kriteriene ås må vi flippe). Så i casen sier vi når firstCard er NOT TRUTHY, altså når verdien er falsy, blir casen true.   
            //legger til .flipped som class. Og setter fistCard til innholdet i cardContainer.
            this.classList.add("flipped");
            firstCard = this
            break
        }//hvis seconCard ikke har innhold, sett innholdet og kjør funnksjon checkForMatch()
        case (!secondCard): {
            this.classList.add("flipped");
            secondCard = this;
            checkForMatch();
            break
        }
    }
}
//lager en variabel som holder styr på antall forsøk
let tryes = 0
let scoreEl = document.querySelector("#score")
//kobler opp en eventlistener til knappen som reloader siden og shufler korta.
const refreshButton = document.querySelector("button")
refreshButton.addEventListener("click", function () {
    window.location.reload();
});

function checkForMatch() {
    //ser etter img tagger inni cardContainer elementet
    //lagrer img src, navnet på bildefilene i hver sin variabel
    const firstPick = firstCard.querySelector("img");
    const secondPick = secondCard.querySelector("img");

    if (firstPick.src === secondPick.src) {
        // sjekker om img.src til firstPick taggen matcher seconPick
        // hvis det er sant så resetter jeg variablene og unlocker brettet. setter variablene til default state.
        resetBoard();
        tryes += 1
        scoreEl.textContent = `amount of tryes:${tryes}`
        gameInfo.append(score)

    } else {
        //hvis de ikke matcher, settes lockBoard til true, og når vi prøver å klikke på flere kort mens sammenligningen pågår sørger øverste casen i switch for at flipCard fuksjonen blir terminert. 
        // så fjerner vi klassen flipped, resetter brettet etter 1000ms
        lockBoard = true;
        tryes += 1
        scoreEl.textContent = `amount of tryes:${tryes}`
        gameInfo.append(score)
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}







