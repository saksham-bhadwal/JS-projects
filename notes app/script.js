const add = document.getElementById("addNotes")
const btn1 = document.getElementById("btn1")

btn1.addEventListener("click", () => {
    const notes = document.createElement("form")
    notes.className = "fixed top-10 right-30 bg-zinc-800 mt-2 rounded-lg  mb-4 "

    notes.innerHTML = `
    <textarea 
    id="note-input"
    placeholder="Write your note..."
    class="w-full bg-zinc-800 p-3 text-white rounded outline-none resize-none"
    rows="4"
  ></textarea>

  <button 
    type="submit"
    class="mt-2 bg-yellow-400 text-black px-4 py-2 rounded"
  >
    Add Note
  </button>
    `
    add.appendChild(notes)

    notes.addEventListener("submit", (event) => {
        event.preventDefault()
        notes.remove()

        const textarea = notes.querySelector("textarea");
        displayNotes(textarea.value);
    })
})

function displayNotes(note) {
    const now = new Date()
    const day = now.toLocaleDateString()


    const notesContainer = document.getElementById("notes-container");
    const newNote = document.createElement("div")

    newNote.className = "bg-zinc-800 rounded p-3 relative "

    newNote.innerHTML = `
     <div class="h-1 bg-yellow-400 absolute top-0 left-0 w-full rounded-t"></div>

               
                <span class="text-yellow-400 text-xs absolute right-2 top-2">${day}</span>

               
                <p class="mt-4 text-sm">
                  ${note}
                </p>
    `
    notesContainer.appendChild(newNote)
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.push(note);

    localStorage.setItem("notes", JSON.stringify(notes));
}




function getTasks() {
    return JSON.parse(localStorage.getItem("notes")) || [];
}
document.addEventListener("DOMContentLoaded", () => {

    const tasks = getTasks();

    tasks.forEach(task => displayNotes(task));

});

