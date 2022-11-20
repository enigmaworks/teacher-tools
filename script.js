const chooseRandomStudentButton = document.getElementById(
	"chooseRandomStudentInput"
);
const saveListButton = document.getElementById("saveListInput");
const loadSavedListButton = document.getElementById("loadSavedListInput");
const clearListButton = document.getElementById("clearListInput");
const assignRandomTeamsButton = document.getElementById(
	"assignRandomTeamsInput"
);
const numberOfTeamsNumber = document.getElementById("numberOfTeamsInput");
const studentListTextarea = document.getElementById("studentListInput");
const randomChoiceSpan = document.getElementById("randomChoice");
const teamsParagraph = document.querySelector("#teamsParagraph");

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
	randomChoiceSpan.textContent = choice;
}

assignRandomTeamsButton.addEventListener("click", assignRandomTeams);
function assignRandomTeams() {
	let numberOfTeams = numberOfTeamsNumber.value;
	let studentList = generateStudentListArray();
	let teams = [];
	const teamSize = Math.floor(studentList.length / numberOfTeams);

	if (!(studentList.length >= numberOfTeams)) {
		teamsParagraph.innerText =
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
		const title = document.createElement("div");
		const teamList = document.createElement("ul");
		title.innerText = `Team ${teamNumber + 1}`;

		output.appendChild(title);
		output.appendChild(teamList);

		team.forEach((teamMember) => {
			const member = document.createElement("li");
			member.innerHTML = teamMember;
			teamList.appendChild(member);
		});
	});

	teamsParagraph.replaceChildren(output);
}

saveListButton.addEventListener("click", () => {
	savedStudentList = studentListTextarea.value;
});

loadSavedListButton.addEventListener("click", () => {
	studentListTextarea.value = savedStudentList;
});

clearListButton.addEventListener("click", () => {
	studentListTextarea.value = "";
});

studentListTextarea.addEventListener("input", () => {
	studentListTextarea.value = studentListTextarea.value.replace(",", "\n");

/* ------------------------------ */
/*         HELPER FUNCTIONS				*/
/* ------------------------------ */

// format the value in the student list input and retun it as an array
function generateStudentListArray() {
	const studentListInput = studentListTextarea.value;
	const array = studentListInput.split(/\r\n|\r|\n/g); // split the string into an array of the values between new line characters
	return array;
}

function generateRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
