let colegi  = ['Radu','Marius','Andu','Dorian','Sunil','Cosmin','Teddy','Vlad','Andrei'];
let colegiDB;

let totalColegi = colegi.length;

let numbers = [];
let numbers2 = [];

let button = document.querySelector("button");

let colegiCuId = [];
// init();
initWithDB();

async function initWithDB() {
    let respononse = await fetch('https://randomizer-79de1.firebaseio.com/.json');
    window.colegiDB = await respononse.json();
    console.log(window.colegiDB)
    draw(window.colegiDB);
}


button.addEventListener('click', function (event) {
    event.preventDefault();
    randomize();
})

async function randomize() {
    let container = document.querySelector('table');
    setTrainerUniqueNumbers();
    setCleanerUniqueNumbers();
    setColeagueIds();
    sort();


    let newDB = JSON.stringify(colegiCuId);

    var response = await fetch('https://randomizer-79de1.firebaseio.com/.json', {
        method: "PUT",
        body: newDB
    });

    container.innerHTML = `        
        <tr>
            <th>Coleg</th>
            <th>ID</th>
            <th>Saptamana</th>
            <th>Trainer</th>
            <th>Cleaner</th>
        </tr>
        `
    initWithDB();
}


function draw(colegiList) {
    let container = document.querySelector('table');
    let template = ``
    counter = 0;
    for (let i in colegiList) {
        let coleg = colegiList[i];

        counter++;
        template += `
            <tr>
                <td>${coleg.nume}</td>
                <td>${counter}</td>
                <td>${counter}</td>
                <td>${coleg.idTrainer}</td>
                <td>${coleg.idCleaner}</td>
            </tr>
        `
    }
    container.innerHTML += template;
}

function setTrainerUniqueNumbers() {
    while (numbers.length < totalColegi) {
        let number = getRandomInt(1, totalColegi);
        if (numbers.indexOf(number) === -1)  {
            numbers.push(number);
        }
    }
}

function setCleanerUniqueNumbers() {
    while (numbers2.length < totalColegi) {
        let number = getRandomInt(1, totalColegi);
        if (numbers2.indexOf(number) === -1)  {
            numbers2.push(number);
        }
    }
}

function setColeagueIds() {
    for( let i = 0; i < totalColegi; i++ ){
        let coleg = colegi[i];
        let userId1 = numbers[i];
        let userId2 = numbers2[i];

        colegiCuId.push({nume: coleg, idTrainer: userId1, idCleaner: userId2 })
    }
}


function sort() {
    colegiCuId.sort(function (itemA, itemB) {
        return (itemA.nume.toLowerCase() > itemB.nume.toLowerCase() ) ? 1 : -1;
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

