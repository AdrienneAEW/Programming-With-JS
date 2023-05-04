
const appTitle = document.querySelector("#app-title")
const appTitleInput = document.querySelector("#app-title-input")
const notesContainer = document.querySelector(".notes-container")
const noteContainers = document.getElementsByClassName("note-container")
const noNotes = document.querySelector(".no-notes-msg")
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
        noteEditBtn.setAttribute("class", "aew-btn edit-note-btn")
        noteEditBtn.setAttribute("title", "edit title and/or note")
        noteEditBtn.setAttribute("aria-label", "edit title and/or note")
        noteEditBtn.setAttribute("onclick", "editDeleteNote(this)")
        noteEditBtn.innerHTML = '&#9997;&#127996;'

        noteDeleteBtn = document.createElement("button")
        noteDeleteBtn.setAttribute("class", "aew-btn delete-note-btn")
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
        noNotes.style.display = "none"
    } else {
        noteNumber++
    }

    if (noteText.value == "") {
        alert("To add a note you need to enter a note. The note input is currently empty.")
        noteText.style.outlineColor = "red"
        noteText.focus()
    }

    if (notesAdded.includes(noteTitle.value)) {
        alert("Titles can only be used once. Add a letter/number to the end of the tile to make it unique.\nOr leave the input empty to generate a default title.")
        noteTitle.focus()
        noteTitle.select()
        noteNumber--
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

let editNoteBtn = document.getElementsByClassName("edit-note-btn")
let deleteNoteBtn = document.getElementsByClassName("delete-note-btn")
function editDeleteNote(element) {
    let findTitle = element.parentElement.getElementsByTagName("h3")[0].innerText
    let noteInd = notesAdded.indexOf(findTitle)
    let noteEdit = noteContainers[noteInd].getElementsByTagName("p")[0]
    let titleEdit = noteContainers[noteInd].getElementsByTagName("h3")[0]
    
    if (element.classList.contains("edit-note-btn")) {        
        titleEdit.contentEditable = true
        noteEdit.contentEditable = true

        titleEdit.style.border = "1px solid green"
        noteEdit.style.border = "1px solid green"

        alert("Click on title and/or note to edit.")

        titleEdit.onblur = () => {titleEdit.contentEditable = false; titleEdit.style.border = "initial"}
        noteEdit.onblur = () => {noteEdit.contentEditable = false; noteEdit.style.border = "initial"}

        notesAdded[noteInd] = titleEdit.innerText
    }

    if (element.classList.contains("delete-note-btn")) {
        if (confirm("Deleted notes cannot be undone. Do you want to delete this note?") == true) {
            noteContainers[noteInd].remove()
            notesAdded.splice(noteInd, 1)
            noteNumber--

        }

        for (let i = 0; i < notesAdded.length; i++) {
            if (notesAdded[i].includes("Note #")) {
                let newTitle = notesAdded[i] = "Note # " + (i + 1)
                    noteContainers[i].getElementsByTagName("h3")[0].innerText = newTitle
            }
            
        }
        
    }
    
}