import React from "react";
import "../styles/DynamicList.css"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <tr key={note.id}>
            <td>{note.title}</td>
            <td>{note.content}</td>
            <td>{note.author}</td>
            <td>{formattedDate}</td>
            <td>
                <button className="delete-button" onClick={() => deleteNote(note.id)}>Delete</button>
            </td>
        </tr>            
    );
}

export default Note
