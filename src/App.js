import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // State variables
  const [notes, setNotes] = useState([]); // Stores the notes
  const [currentNote, setCurrentNote] = useState(''); // Stores the value of the current note being entered

  // Use the 'useCookies' hook to access cookies
  const [cookies, setCookie] = useCookies(['notes']);

  // useEffect hook to restore notes from the 'notes' cookie on component mount
  useEffect(() => {
    if (cookies.notes) {
      setNotes(cookies.notes);
    }
  }, [cookies.notes, setNotes]);

  // Function to add a note
  const addNote = () => {
    if (currentNote.trim() !== '') {
      // Create a copy of the notes array and add the currentNote value to it
      const updatedNotes = [...notes, currentNote];
      // Update the notes state with the updated copy
      setNotes(updatedNotes);
      // Update the 'notes' cookie with the updated copy
      setCookie('notes', updatedNotes, { path: '/' });
      // Reset the currentNote value to an empty string
      setCurrentNote('');
    }
  };

  // Function to delete a note
  const deleteNote = (index) => {
    // Create a copy of the notes array
    const updatedNotes = [...notes];
    // Remove the note at the specified index from the copy
    updatedNotes.splice(index, 1);
    // Update the notes state with the updated copy
    setNotes(updatedNotes);
    // Update the 'notes' cookie with the updated copy
    setCookie('notes', updatedNotes, { path: '/' });
  };

  // Function to export notes as a text file
  const exportNote = () => {
    const divider = "-----------";
    // Join the notes array with the divider in between each note
    const text = notes.join(`\n${divider}\n`);
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'notes.txt';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="container mt-4">
      <h2>Note Taking App</h2>
      <div className="input-group mb-3">
        {/* Input field for entering a new note */}
        <input
          type="text"
          className="form-control"
          placeholder='Enter a note'
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
        />
        <div className='input-group-append'>
          {/* Button to add a new note */}
          <button className='btn btn-primary' onClick={addNote}>Add Note</button>
        </div> 
      </div>
      <div>
        <ul className='list-group'>
          {/* Render each note in the list */}
          {notes.map((note, index) => (
            <li className='list-group-item' key={index}>
              {/* Note text */}
              {note}
              {/* Button to delete a note */}
              <button className="btn btn-danger btn-sm tiny" onClick={() => deleteNote(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-3'>
        {/* Button to export notes */}
        <button className='btn btn-success' onClick={exportNote}>Export Note</button>
      </div>
    </div>
  )
}

export default App;
