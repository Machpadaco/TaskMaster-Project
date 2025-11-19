const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

studentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: studentForm.name.value,
    email: studentForm.email.value,
    course: studentForm.course.value,
    progress: parseInt(studentForm.progress.value),
    userId: localStorage.getItem('userId')
  };

  const res = await fetch('/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert('Student added!');
  loadStudents();
});

async function loadStudents() {
  const userId = localStorage.getItem('userId');
  const res = await fetch(`/students/${userId}`);
  const students = await res.json();

  studentList.innerHTML = students.map(s => `<li>${s.name} - ${s.course}</li>`).join('');
}

window.onload = loadStudents;
