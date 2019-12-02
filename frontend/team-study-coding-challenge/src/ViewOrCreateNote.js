import React from 'react';
import Quill from 'quill';

class ViewOrCreateNote extends React.Component {        
    constructor(props) {
        super(props);
        this.saveNote = this.saveNote.bind(this);
    }
    
    componentDidMount() {
        const config = {
            theme: 'snow'
        };
        const titleQuill = new Quill(".note-title", config);
        const bodyQuill = new Quill(".note-body", config);

        const noteElem = this.props.noteElem;
        const titleQuillDelta = {
            "ops": []
        };
        if (noteElem) {
            titleQuillDelta["ops"].push({"insert": noteElem["title"]});
        }
        const bodyQuillDelta = {
            "ops": []
        };
        if (noteElem) {
            bodyQuillDelta["ops"].push({"insert": noteElem["body"]});
        }

        titleQuill.setContents(titleQuillDelta);
        titleQuill.enable(!!!noteElem);
        bodyQuill.setContents(bodyQuillDelta);
        bodyQuill.enable(!!!noteElem);
    }

    saveNote() {
        const titleQuill = new Quill(".note-title");
        const bodyQuill = new Quill(".note-body");

        const titleData = titleQuill.getContents().ops[0]["insert"]
        const bodyData = bodyQuill.getContents().ops[0]["insert"]
        this.props.saveNote(titleData, bodyData);
        this.props.unselectNote();
    }
    
    render() {
        return (
            <div>
                <div className="header">Title:</div>
                <div className="note-title"></div>
                <div className="header">Body:</div>
                <div className="note-body"></div>
                <div className="note-action" onClick={!!this.props.noteElem ? this.props.unselectNote : this.saveNote}>{!!this.props.noteElem ? "View All Notes" : "Save Note"}</div>
            </div>
        )
    }
}

export default ViewOrCreateNote;
