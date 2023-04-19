
const appTitle = document.querySelector("#app-title")
const appTitleInput = document.querySelector("#app-title-input")
const notesContainer = document.querySelector(".notes-container")
const noteText = document.querySelector("#note-text")
const noteTitle = document.querySelector("#note-title")
let noteContainer, titleContent, noteContent, noteEditBtn, noteDeleteBtn, noteNumber, noteAdd
let notesAdded = []

function editTitle(element) {
    element.disabled = true
    appTitle.style.display = "none";
    appTitleInput.style.display = "block";
    appTitleInput.focus()
    
    appTitleInput.onblur = () => {

        if (appTitleInput.value !== "") appTitle.innerText = appTitleInput.value;
        appTitle.style.display = "block"
        appTitleInput.value = ""
        appTitleInput.style.display = "none"
        element.disabled = false
    }
    
}

class NewNote {
    constructor (title, note) {
        this.title = title
        this.note = note
    }

    createNote() {
        noteContainer = document.createElement("div")
        noteContainer.setAttribute("class", "note-container")
        titleContent = document.createElement("h3")
        titleContent.innerText = this.title
        titleContent.setAttribute("class", "note-title")
        noteContent = document.createElement("p")
        noteContent.setAttribute("class", "note-content")
        noteContent.innerText = this.note
        noteEditBtn = document.createElement("button")
        noteEditBtn.setAttribute("class", "btn edit-note-btn")
        noteEditBtn.setAttribute("title", "edit note")
        noteEditBtn.setAttribute("aria-label", "edit note")
        noteEditBtn.setAttribute("onclick", "editDeleteNote(this)")
        noteEditBtn.innerHTML = '&#9997;&#127996;'

        noteDeleteBtn = document.createElement("button")
        noteDeleteBtn.setAttribute("class", "btn edit-delete-btn")
        noteDeleteBtn.setAttribute("title", "delete note")
        noteDeleteBtn.setAttribute("aria-label", "delete note")
        noteDeleteBtn.setAttribute("onclick", "editDeleteNote(this)")
        noteDeleteBtn.innerHTML = '&#10060;'

        noteContainer.appendChild(titleContent)
        noteContainer.appendChild(noteContent)
        noteContainer.appendChild(noteEditBtn)
        noteContainer.appendChild(noteDeleteBtn)
        notesContainer.appendChild(noteContainer)
    }
}

function addNote() {
        if (notesAdded.length == 0) {
        noteNumber = 1
    } else {
        noteNumber++
    }

    if (noteText.value == "") {
        alert("To add a note you need to enter a note. The note input is currently empty.")
        noteText.focus()
        noteText.style.outlineColor = "red"
        noteText.onblur = () => noteText.style.outlineColor = "initial"
    } else {
        if (noteTitle.value == "") {
            noteTitle.value = "Note # " + noteNumber
        }
        notesAdded.push(noteTitle.value)
        noteAdd = new NewNote(noteTitle.value, noteText.value)
        noteAdd.createNote()
        noteTitle.value = ""
        noteText.value = ""
        noteTitle.focus()
        console.log(noteNumber)
    }

}