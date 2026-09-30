const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const searchInput = document.getElementById("searchInput");
const notesContainer = document.getElementById("notesContainer");
const emptyMessage = document.getElementById("emptyMessage");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editingId = null;


// Save notes to localStorage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}


// Display notes
function displayNotes(searchTerm = "") {

    notesContainer.innerHTML = "";

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredNotes.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    filteredNotes.forEach(note => {

        const noteElement = document.createElement("div");

        noteElement.className = "note";

        if (note.completed) {
            noteElement.classList.add("completed");
        }

        noteElement.innerHTML = `
            <h3>${note.title}</h3>

            <p>${note.text}</p>

            <small>
                Created: ${new Date(note.createdAt).toLocaleString()}
            </small>

            <div class="note-buttons">

                <button
                    class="complete-btn"
                    onclick="toggleComplete(${note.id})">
                    ${note.completed ? "Undo" : "Complete"}
                </button>

                <button
                    class="edit-btn"
                    onclick="editNote(${note.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteNote(${note.id})">
                    Delete
                </button>

            </div>
        `;

        notesContainer.appendChild(noteElement);
    });
}


// Add or update note
saveBtn.addEventListener("click", function () {

    const title = noteTitle.value.trim();
    const text = noteText.value.trim();

    if (title === "" || text === "") {
        alert("Please enter both a title and note.");
        return;
    }

    if (editingId !== null) {

        const note = notes.find(note => note.id === editingId);

        note.title = title;
        note.text = text;
        note.updatedAt = new Date().toISOString();

        editingId = null;
        saveBtn.textContent = "Add Note";

    } else {

        const newNote = {
            id: Date.now(),
            title: title,
            text: text,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            completed: false
        };

        notes.push(newNote);
    }

    saveNotes();

    noteTitle.value = "";
    noteText.value = "";

    displayNotes();
});


// Edit note
function editNote(id) {

    const note = notes.find(note => note.id === id);

    if (!note) {
        return;
    }

    noteTitle.value = note.title;
    noteText.value = note.text;

    editingId = id;

    saveBtn.textContent = "Update Note";
}


// Delete note
function deleteNote(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) {
        return;
    }

    notes = notes.filter(note => note.id !== id);

    saveNotes();

    displayNotes(searchInput.value);
}


// Complete / undo note
function toggleComplete(id) {

    const note = notes.find(note => note.id === id);

    if (!note) {
        return;
    }

    note.completed = !note.completed;
    note.updatedAt = new Date().toISOString();

    saveNotes();

    displayNotes(searchInput.value);
}


// Cancel editing
cancelBtn.addEventListener("click", function () {

    noteTitle.value = "";
    noteText.value = "";

    editingId = null;

    saveBtn.textContent = "Add Note";
});


// Search notes
searchInput.addEventListener("input", function () {

    displayNotes(searchInput.value);

});


// Display saved notes when page loads
displayNotes();