import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');

  const addNote = () => {
    if (currentNote.trim() !== '') {
      setNotes([...notes, currentNote]);
      setCurrentNote('');
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index,1);
    setNotes(updatedNotes)
  }
  const exportNote = () => {
    const divider = "-----------";
    const text = notes.join(`\n${divider}\n`);
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'notes.txt';
    document.body.appendChild(element);
    element.click();
  };
  return (
    <div className="container mt-4">
      <h2>Note Taking App</h2>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder='Enter a note' value={currentNote} onChange={(e) => setCurrentNote(e.target.value)} />
        <div className='input-group-append'>
          <button className='btn btn-primary' onClick={addNote}>Add Note</button>
        </div> 
      </div>
      <div>
        <ul className='list-group'>
          {notes.map((note, index) => (
            <li className='list-group-item' key={index}>
              {note}
              <button className="btn btn-danger btn-sm tiny" onClick={() => deleteNote(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-3'>
          <button className='btn btn-success' onClick={exportNote}>Export Note</button>
      </div>
    </div>
  )
}

export default App;