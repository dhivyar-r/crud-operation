let students = [];
let editingIndex = -1;
let previousState = [];

function showForm(index = -1) {
  document.getElementById("formPopup").style.display = "block";
  document.getElementById("overlay").style.display = "block";

  if (index >= 0) {
    editingIndex = index;
    const s = students[index];
    document.getElementById('clgid').value = s.clgid;
    document.getElementById('name').value = s.name;
    document.getElementById('email').value = s.email;
    document.getElementById('city').value = s.city;
    document.getElementById('formTitle').innerText = "Edit Student";
  } else {
    editingIndex = -1;
    document.getElementById('formTitle').innerText = "Add Student";
    document.getElementById('clgid').value = "";
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('city').value = "";
  }
}

function closeForm() {
  document.getElementById("formPopup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function saveStudent() {
  const clgid = document.getElementById('clgid').value.trim();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const city = document.getElementById('city').value.trim();

  if (!clgid || !name || !email || !city) {
    alert("All fields are required.");
    return;
  }

  const newStudent = { clgid, name, email, city };

  if (editingIndex >= 0) {
    students[editingIndex] = newStudent;
  } else {
    students.push(newStudent);
  }

  renderTable();
  closeForm();
}

function renderTable() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = "";

  students.forEach((s, index) => {
    const row = `<tr>
      <td data-label="College ID">${s.clgid}</td>
      <td data-label="Name">${s.name}</td>
      <td data-label="Email">${s.email}</td>
      <td data-label="City">${s.city}</td>
      <td data-label="Actions">
        <button onclick="showForm(${index})">✏️</button>
        <button onclick="deleteStudent(${index})">🗑️</button>
        <button onclick="viewStudent(${index})">👁️</button>
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function deleteStudent(index) {
  previousState = [...students];
  students.splice(index, 1);
  renderTable();
}

function undoDelete() {
  if (previousState.length > 0) {
    students = [...previousState];
    previousState = [];
    renderTable();
  } else {
    alert("No recent deletion to undo.");
  }
}

function searchTable() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#studentTable tbody tr");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}

function viewStudent(index) {
  const s = students[index];
  alert(`College ID: ${s.clgid}\nName: ${s.name}\nEmail: ${s.email}\nCity: ${s.city}`);
}

function selectAllToggle() {
  alert("Select All feature is reserved — no checkbox logic as per your request.");
}
