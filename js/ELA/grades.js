let currentSubject = '';
let currentGrade = '';
let previousPage = '';
let currentBand = 'k5';

const ALL_GRADES = [
  { id: 'K1', name: 'K1', band: 'k5' },
  { id: 'K2', name: 'K2', band: 'k5' },
  { id: 'G1',  name: 'Grade 1', band: 'k5' },
  { id: 'G2',  name: 'Grade 2', band: 'k5' },
  { id: '3',  name: 'Grade 3', band: 'k5' },
  { id: '4',  name: 'Grade 4', band: 'k5' },
  { id: '5',  name: 'Grade 5', band: 'k5' },
  { id: '6',  name: 'Grade 6', band: '68' },
  { id: '7',  name: 'Grade 7', band: '68' },
  { id: '8',  name: 'Grade 8', band: '68' },
  { id: '9',  name: 'Grade 9', band: '912' },
  { id: '10', name: 'Grade 10', band: '912' },
  { id: '11', name: 'Grade 11', band: '912' },
  { id: '12', name: 'Grade 12', band: '912' }
];

function initGradeBands(subject, defaultBand = 'k5') {
  currentSubject = subject;
  setBand(defaultBand);
  // Hook up tab clicks
  document.querySelectorAll('.band-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.band-tab').forEach(b => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      setBand(btn.dataset.band);
    });
  });
}

function setBand(band) {
  currentBand = band;
  const gradesInBand = ALL_GRADES.filter(g => g.band === band);
 // buildTOC(gradesInBand);
  populateGrades(currentSubject, band);
}

function buildTOC(gradesInBand) {
  const toc = document.getElementById('toc');
  toc.innerHTML = `
    <h3 class="toc-title">Grades</h3>
    <ul class="toc-list">
      ${gradesInBand.map(g => `
        <li>
          <button class="toc-link" data-grade="${g.id}" aria-label="${g.name}">
            ${g.name}
          </button>
        </li>`).join('')}
    </ul>
  `;

  // Click behavior: selecting a grade from the ToC acts like clicking the card
  toc.querySelectorAll('.toc-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.grade;
      const card = document.querySelector(`.grade-card[data-grade="${id}"]`);
      if (card) {
        card.focus();
        card.click();
      }
    });
  });
}

function populateGrades(subject, band = 'k5') {
  const gradeGrid = document.getElementById('grade-grid');
  gradeGrid.innerHTML = '';

  const grades = ALL_GRADES.filter(g => g.band === band);

  grades.forEach(grade => {
    const gradeCard = document.createElement('button');
    gradeCard.className = 'grade-card';
    gradeCard.type = 'button';
    gradeCard.setAttribute('data-grade', grade.id);
    gradeCard.innerHTML = `<h4>${grade.name}</h4>`;

    gradeCard.onclick = () => {
      if (grade.id === 'K1'||grade.id === 'K2' || grade.id === 'G1'|| grade.id === 'G2' ) {
        const formattedSubject = formatSubjectName(subject);
        const pageUrl = `../../html/ELA/${grade.id}/${formattedSubject}-${grade.id}-UnitMap.html`;
        window.location.href = pageUrl;
      } else {
        alert('This grade is still under development. Please check back later!');
      }
    };

    gradeGrid.appendChild(gradeCard);
  });
}

function formatSubjectName(subject) {
  const subjectMap = {
    'ELA': 'ela',
    'Math': 'math',
    'Mathematics': 'math',
    'Science': 'science',
    'Biology': 'biology',
    'Chemistry': 'chemistry',
    'Physics': 'physics',
    'Technology': 'technology',
    'Engineering': 'engineering',
    'Arts': 'arts'
  };

  return subjectMap[subject] || subject.toLowerCase().replace(/\s+/g, '-');
}
