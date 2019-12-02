import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ViewOrCreateNote from "./ViewOrCreateNote.js";

class ListOfNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            viewOrEditNote: false,
            selectedNoteIndex: -1
        }
        this.unselectNote = this.unselectNote.bind(this);
    }

    async getAllNotes() {
        await fetch("http://localhost:8000/notes/")
            .then(res => res.text())
            .then(res => this.setState(
                JSON.parse(res)
            ));
    }

    componentWillMount() {
        this.getAllNotes();
    }

    selectNote(noteIndex) {
        this.setState({
            notes: this.state.notes,
            viewOrEditNote: true,
            selectedNoteIndex: noteIndex
        });
    }

    unselectNote() {
        this.setState({
            notes: this.state.notes,
            viewOrEditNote: false,
            selectedNoteIndex: -1
        });
        this.getAllNotes();
    }

    async saveNote(noteTitle, noteBody) {
        await fetch("http://localhost:8000/notes/create-note/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: noteTitle,
                body: noteBody
            })
        });
    }
    
    render() {
        return this.state.viewOrEditNote ? 
        (
            <ViewOrCreateNote
                noteElem={this.state.notes[this.state.selectedNoteIndex]}
                unselectNote={this.unselectNote}
                saveNote={this.saveNote}
            />
        )
        : 
        (
            <div className="notes-list">
                <h1 className="notes-list-title">Available notes: </h1>
                <ul>
                    {this.state.notes.map((element, index) => 
                        <div key={index} onClick={(e) => this.selectNote(index)} className="list-title">{element.title}</div>
                    )}
                </ul>
                <h2 onClick={(index) => this.selectNote(-1)} className="new-note">+ New Note</h2>
            </div>
        )
    }
}

// =============================

ReactDOM.render(<ListOfNotes />, document.getElementById('root'));
