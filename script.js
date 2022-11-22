const chooseRandomStudentButton = document.getElementById(
	"chooseRandomStudentInput"
);
const saveListButton = document.getElementById("saveListInput");
const saveListNameInput = document.getElementById("saveListNameInput");
const savedButtonsContainer = document.getElementById("savedListsDiv");
const toggleDeleteCheck = document.getElementById("toggleDeleteCheck");
const clearListButton = document.getElementById("clearListInput");
const assignRandomTeamsButton = document.getElementById(
	"assignRandomTeamsInput"
);
const numberOfTeamsNumber = document.getElementById("numberOfTeamsInput");
const studentListTextarea = document.getElementById("studentListInput");
const outputDiv = document.getElementById("outputDiv");

const localStorageItemKey = "TeacherToolsSavedLists";
let savedData = getSavedLists();
createLoadButtons(savedData);

/* ------------------------------ */
/*         LIST ACTIONS   				*/
/* ------------------------------ */

chooseRandomStudentButton.addEventListener("click", chooseRandomStudent);
function chooseRandomStudent() {
	let studentList = generateStudentListArray();
	let randomInteger = generateRandomInteger(0, studentList.length - 1);
	let choice = studentList[randomInteger];

	studentList.splice(randomInteger, 1);
	studentListTextarea.value = studentList.join("\n");
	outputDiv.textContent = "Student: " + choice;
}

assignRandomTeamsButton.addEventListener("click", assignRandomTeams);
function assignRandomTeams() {
	let numberOfTeams = numberOfTeamsNumber.value;
	let studentList = generateStudentListArray();
	let teams = [];
	const teamSize = Math.floor(studentList.length / numberOfTeams);

	if (!(studentList.length >= numberOfTeams)) {
		outputDiv.textContent =
			"There are not enough students to make this many teams!";
		return;
	}

	// add as many students as possible to each team, until there are less students then teams left
	for (let teamCount = 0; teamCount < numberOfTeams; teamCount++) {
		let newTeam = [];
		for (let studentCount = 0; studentCount < teamSize; studentCount++) {
			const randomStudentIndex = Math.floor(
				Math.random() * (studentList.length - 1)
			);
			newTeam.push(studentList[randomStudentIndex]);
			studentList.splice(randomStudentIndex, 1); //remove the student from the list of remaining students
		}
		teams.push(newTeam);
	}

	let teamNumberForLeftover = 0; // the index of the team to add the leftover to
	let leftoverStudents = studentList.length; // the amount of left over students

	while (leftoverStudents > 0) {
		teams[teamNumberForLeftover].push(studentList[0]); //add the leftover student to a team
		studentList.splice(0, 1); //remove the student from the list of remaining students
		leftoverStudents--;
		teamNumberForLeftover++;
	}

	let output = document.createDocumentFragment();

	teams.forEach((team, teamNumber) => {
		const title = document.createElement("h4");
		const teamList = document.createElement("ul");
		teamList.classList.add("team");
		title.textContent = `Team ${teamNumber + 1}`;

		output.appendChild(title);
		output.appendChild(teamList);

		team.forEach((teamMember) => {
			const member = document.createElement("li");
			member.textContent = teamMember;
			teamList.appendChild(member);
		});
	});

	outputDiv.replaceChildren(output);
}

/* ------------------------------ */
/*        SAVING / LOADING				*/
/* ------------------------------ */

// format and save the values in student input list to local storage
saveListButton.addEventListener("click", saveCurrentList);
function saveCurrentList() {
	const studentListArray = generateStudentListArray();
	let listName = saveListNameInput.value;

	if (studentListArray.length < 2) {
		console.log("list must have more than one entry");
		return;
	}

	if (listName === "") {
		const time = new Date();
		listName = time.toLocaleString();
	}

	savedData[listName] = studentListArray;
	localStorage.setItem(localStorageItemKey, JSON.stringify(savedData));

	createLoadButtons(savedData);
	saveListNameInput.value = "";
}

// clear the student list input and list name input
clearListButton.addEventListener("click", clearCurrentList);
function clearCurrentList() {
	studentListTextarea.value = "";
	saveListNameInput.value = "";
}

// replace commas with new lines on input
studentListTextarea.addEventListener("input", addNewlines);
function addNewlines() {
	studentListTextarea.value = studentListTextarea.value.replace(",", "\n");
}

/* ------------------------------ */
/*         HELPER FUNCTIONS				*/
/* ------------------------------ */

// acess and format any saved lists in local storage, return as a object
function getSavedLists() {
	let data = JSON.parse(localStorage.getItem(localStorageItemKey));
	if (!data) data = {};
	return data;
}

function unsaveList(index) {
	const listName = Object.keys(savedData)[index];
	delete savedData[listName];
	toggleDeleteCheck.checked = false;
	localStorage.setItem(localStorageItemKey, JSON.stringify(savedData));
	createLoadButtons(savedData);
}

// generate buttons to load/delete any student lists passed in parameter
function createLoadButtons(savedLists) {
	const savedListNames = Object.keys(savedLists);
	const savedListValues = Object.values(savedLists);
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < savedListNames.length; i++) {
		const newButtonElement = document.createElement("button");

		newButtonElement.textContent = savedListNames[i];
		newButtonElement.addEventListener("click", () => {
			if (toggleDeleteCheck.checked) {
				unsaveList(i);
			} else {
				studentListTextarea.value = savedListValues[i].join("\n");
			}
		});

		fragment.appendChild(newButtonElement);
	}

	savedButtonsContainer.replaceChildren(fragment);
}

// format the value in the student list input and retun it as an array
function generateStudentListArray() {
	const studentListInput = studentListTextarea.value;
	const array = studentListInput.split(/\r\n|\r|\n/g); // split the string into an array of the values between new line characters
	return array;
}

function generateRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
