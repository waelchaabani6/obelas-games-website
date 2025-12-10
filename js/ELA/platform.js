
// platform.js

// Define global variables safely
// This makes sure they exist before grades.js uses them
window.currentSubject = window.currentSubject || null; 
window.currentGrade = window.currentGrade || null; 

// Example: initialize currentSubject when user selects one
function setSubject(subjectName) {
  window.currentSubject = subjectName;
  console.log("Subject set to:", window.currentSubject);
}

// Example: initialize currentGrade when user selects one
function setGrade(gradeName) {
  window.currentGrade = gradeName;
  console.log("Grade set to:", window.currentGrade);
}

// Optional: expose helpers so other scripts can read values
function getCurrentSubject() {
  return window.currentSubject;
}

function getCurrentGrade() {
  return window.currentGrade;
}

// Attach helpers to global scope if you want
window.setSubject = setSubject;
window.setGrade = setGrade;
window.getCurrentSubject = getCurrentSubject;
window.getCurrentGrade = getCurrentGrade;

function showPlatform(subject, grade) {
  document.body.innerHTML = `
    <header><a href="${subject.toLowerCase()}.html">← Back to Grades</a></header>
    <h2>${subject} - Grade ${grade} Learning Platform</h2>
    <div id="platform-buttons"></div>
  `;

  const buttonsContainer = document.getElementById("platform-buttons");

  if (subject === "ELA") {
    addPlatformButton("📖 Reading Adventures", () => launchActivity("Reading Game"));
    addPlatformButton("✍️ Writing Workshop", () => launchActivity("Writing Studio"));
  }
  // Add cases for other subjects
}

function addPlatformButton(text, onClick) {
  const button = document.createElement("button");
  button.className = "game-button";
  button.textContent = text;
  button.onclick = onClick;
  document.getElementById("platform-buttons").appendChild(button);
}

function launchActivity(name) {
  alert(`Launching ${name}...`);
}
