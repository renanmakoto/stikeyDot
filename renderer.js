const fs = require('fs')
const path = require('path')
const { ipcRenderer } = require('electron')

const notePath = path.join(__dirname, 'note.txt')
const textarea = document.getElementById('note')
const lockButton = document.getElementById('lock')
const lockIcon = lockButton.querySelector('i')

let isLocked = false

function initializeState() {
    textarea.disabled = isLocked
    lockIcon.className = isLocked ? 'fas fa-lock' : 'fas fa-lock-open'
}

if (fs.existsSync(notePath)) {
    const savedNote = fs.readFileSync(notePath, 'utf8')
    textarea.value = savedNote
}

initializeState()

textarea.addEventListener('input', () => {
    if (!isLocked) {
        const noteContent = textarea.value
        fs.writeFileSync(notePath, noteContent)
    }
})

document.getElementById('minimize').addEventListener('click', () => {
    ipcRenderer.send('minimize-window')
})

document.getElementById('close').addEventListener('click', () => {
    ipcRenderer.send('close-window')
})

lockButton.addEventListener('click', () => {
    isLocked = !isLocked
    textarea.disabled = isLocked
    lockIcon.className = isLocked ? 'fas fa-lock' : 'fas fa-lock-open'
})
