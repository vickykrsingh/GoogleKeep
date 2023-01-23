const addNoteBtn = document.querySelector("#note");

const updateLSData = () => {
    const textArea = document.querySelectorAll('textarea');
    const notes = [];
    textArea.forEach((ele)=>{
        return notes.push(ele.value)
    })
    localStorage.setItem('myNotes',JSON.stringify(notes))
}

const notes = document.createElement("div");
notes.classList.add("notes");
const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="operation">
        <i class="fa-solid fa-pen edit"></i>
        <i class="fa-regular fa-circle-xmark del"></i>
    </div>

    <textarea class="textArea ${text ? "hidden" : ""}"></textarea>
    <div class="main ${text ? "" : "hidden"}" ></div>`;

  note.insertAdjacentHTML("afterbegin", htmlData);

  const edit = note.querySelector(".edit");
  const del = note.querySelector(".del");
  const textArea = note.querySelector(".textArea");
  const mainDiv = note.querySelector(".main");

  textArea.value = text;
  mainDiv.innerHTML = text;

  del.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });
  edit.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });
  textArea.addEventListener("change", (event) => {
    value = event.target.value;
    mainDiv.innerHTML = value;
    updateLSData();
  });

  notes.appendChild(note);
  document.body.appendChild(notes);
};

const myNotes = JSON.parse(localStorage.getItem('myNotes'))
if(myNotes){myNotes.forEach((note)=>{
    addNewNote(note)
})}

addNoteBtn.addEventListener("click", () => addNewNote());
