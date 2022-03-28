const chooseRandomStudentButton = document.getElementById("chooseRandomStudentInput");
const saveListButton = document.getElementById("saveListInput");
const loadSavedListButton = document.getElementById("loadSavedListInput");
const clearListButton = document.getElementById("clearListInput");
const assignRandomTeamsButton = document.getElementById("assignRandomTeamsInput")
const numberOfTeamsNumber = document.getElementById("numberOfTeamsInput")
const studentListTextarea = document.getElementById("studentListInput");
const randomChoiceSpan = document.getElementById("randomChoice");

const debug = true;

var savedStudentList;

// Event listeners are added for the interface in this block.

chooseRandomStudentButton.addEventListener('click', chooseRandomStudent);
assignRandomTeamsButton.addEventListener('click', assignRandomTeams)
saveListButton.addEventListener('click', saveList);
loadSavedListButton.addEventListener('click', loadList);
clearListButton.addEventListener('click', clearList)

function generateStudentList() {
    let list = studentListTextarea.value.split(/\r\n|\r|\n/g);
    if (debug == true) {
        console.log(list);
    }
    return list;
}

function assignRandomTeams() {
    let numberOfTeams = numberOfTeamsNumber.value;
    let studentList = generateStudentList();
    if (debug == true) {
        console.log(numberOfTeams);
        console.log(studentList);
    }
    // Need to choose a student at random and then assign them to teamN
    // Then the program should choose another student and assign them to teamN + 1
    // Finally when N is greater than numberOfTeams it should reset N to 1
    while (studentList != "") {
        for (let i = 0; i <= numberOfTeams; i++) {
            
        }
    }
}

function chooseRandomStudent() {
    let studentList = generateStudentList();
    let randomInteger = generateRandomInteger(0, studentList.length - 1);
    if (debug == true) {
        console.log(studentList);
        console.log(randomInteger);
    }
    let choice = studentList[randomInteger];
    if (debug == true) {
        console.log(choice)
    }
    studentList.splice(randomInteger, 1);
    studentListTextarea.value = studentList.join("\n");
    randomChoiceSpan.textContent = choice;
}

function clearList() {
    studentListTextarea.value = "";
}

function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadList() {
    studentListTextarea.value = savedStudentList;
}

function saveList() {
    savedStudentList = studentListTextarea.value;
}
