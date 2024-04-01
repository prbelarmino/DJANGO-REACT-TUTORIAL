import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import Equipment from "../components/Equipment"
import UpperBar from "../components/UpperBar";
import "../styles/Home.css"
import '../styles/DynamicList.css'; // Import CSS for styling

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div >
            <UpperBar />
            <h2>Lista de Equipamentos</h2>
            <table className="dynamic-list-table">
                <thead>
                    <tr>
                        <th>Modelo</th>
                        <th>Fabricante</th>
                        <th>Matricula</th>
                        <th>Addition Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <Equipment note={note} onDelete={deleteNote} key={note.id} />
                    ))}
                </tbody>
            </table>
            
            <form onSubmit={createNote}>
            <h2>Adicionar Equipamento</h2>
                <label htmlFor="title">Modelo:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Fabricante:</label>
                <br />
                <textarea
                    type="text"
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;
