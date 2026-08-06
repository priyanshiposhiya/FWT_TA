let currentRow = 0;

let startRoll = 0;
let endRoll = 0;

let absentList = [];

// Generate Attendance Table

function generateTable() {
  startRoll = Number(document.getElementById("startRoll").value);

  endRoll = Number(document.getElementById("endRoll").value);

  if (startRoll == 0 || endRoll == 0 || startRoll > endRoll) {
    alert("Enter valid roll number");

    return;
  }

document.getElementById("attendanceTable").style.display = "table";

  let table = "";

  for (let i = startRoll; i <= endRoll; i++) {
    table += `
        <tr id="row${i}">
            <td> ${i}</td>

            <td>
                <span id="status${i}" class="status pending"> Pending </span>
            </td>

            <td>
                <button class="presentBtn" onclick="present(${i})"> Present </button>

                <button class="absentBtn" onclick="absent(${i})"> Absent </button>
            </td>
        </tr>`;
  }

  document.getElementById("tableBody").innerHTML = table;

  currentRow = 0;

  highlight();
}

// Present Student

function present(roll) {
  let status = document.getElementById("status" + roll);

  status.innerHTML = "Present";

  status.className = "status present";

  updateSummary();
}

// Absent Student

function absent(roll) {
  let status = document.getElementById("status" + roll);

  status.innerHTML = "Absent";

  status.className = "status absent";

  updateSummary();
}

// All Present

function allPresent() {
  for (let i = startRoll; i <= endRoll; i++) {
    present(i);
  }
  updateSummary();
}

// All Absent

function allAbsent() {
  for (let i = startRoll; i <= endRoll; i++) {
    absent(i);
  }
  updateSummary();
}

// Reset Attendance

function resetAttendance() {
  for (let i = startRoll; i <= endRoll; i++) {
    let status = document.getElementById("status" + i);

    status.innerHTML = "Pending";

    status.className = "status pending";

    document.getElementById("totalStudent").innerHTML = 0;
    document.getElementById("totalPresent").innerHTML = 0;
    document.getElementById("totalAbsent").innerHTML = 0;
    document.getElementById("presentList").innerHTML = "";
    document.getElementById("absentList").innerHTML = "";
    document.getElementById("downloadBtn").style.display = "none";

    document.getElementById("startRoll").value = "";
    document.getElementById("endRoll").value = "";
    document.getElementById("tableBody").innerHTML = "";

    document.getElementById("summaryBox").style.display = "none";
    document.getElementById("attendanceTable").style.display = "none";

  }

  updateSummary();
}

// updateSummary
function updateSummary() {
    if (startRoll == 0) {
    alert("Generate table first");

    return;
  }

  let presentList = [];

  absentList = [];

  for (let i = startRoll; i <= endRoll; i++) {
    let status = document.getElementById("status" + i).innerHTML;

    if (status == "Present") {
      presentList[presentList.length] = i;
    } else if (status == "Absent") {
      absentList[absentList.length] = i;
    }   
  }

  document.getElementById("totalStudent").innerHTML = endRoll - startRoll + 1;

  document.getElementById("totalPresent").innerHTML = presentList.length;

  document.getElementById("totalAbsent").innerHTML = absentList.length;

  if (presentList.length > 0) {
    document.getElementById("presentList").innerHTML = presentList.join(", ");
  } else {
    document.getElementById("presentList").innerHTML = "No Present Student";
  }

  if (absentList.length > 0) {
    document.getElementById("absentList").innerHTML = absentList.join(", ");
  } else {
    document.getElementById("absentList").innerHTML = "No Absent Student";
  }

}

// Save Attendance

function saveAttendance() {
updateSummary();
  document.getElementById("summaryBox").style.display = "block";
  document.getElementById("downloadBtn").style.display = "block";

  alert("Attendance Saved Successfully");
}

// Download TXT File

function download() {
  let text = "Absent Student List\n\n";

  if (absentList.length == 0) {
    text += "No Absent Student";
  } else {
    text += "Roll No : " + absentList.join(", ");
  }

  let file = new Blob(
    [text],

    {
      type: "text/plain",
    },
  );

  let link = document.createElement("a");

  link.href = URL.createObjectURL(file);

  link.download = "Absent_Student_List.txt";

  link.click();
}

// Highlight Selected Row

function highlight() {
  for (let i = startRoll; i <= endRoll; i++) {
    document.getElementById("row" + i).className = "";
  }

  document.getElementById("row" + (startRoll + currentRow)).className =
    "active";

  document.getElementById("row" + (startRoll + currentRow)).scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

// Keyboard Events
document.addEventListener("keydown", keyEvents);

function keyEvents(event) {
  if (startRoll == 0) {
    return;
  }

  if (event.key == "ArrowDown") {
    if (currentRow < endRoll - startRoll) {
      currentRow++;
    }

    highlight();
  }

  if (event.key == "ArrowUp") {
    if (currentRow > 0) {
      currentRow--;
    }

    highlight();
  }

  if (event.key == "ArrowLeft") {
    absent(startRoll + currentRow);
  }

  if (event.key == "ArrowRight") {
    present(startRoll + currentRow);
  }
};
