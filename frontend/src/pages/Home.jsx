import { useState, useEffect } from "react";
import api from "../api";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Equipment from "../components/Equipment"
import EquipmentList from "../components/EquipmentList";
import "../styles/Home.css"
import '../styles/DynamicList.css'; // Import CSS for styling
import '../styles/Table.css'; // Import CSS for styling
import { useNavigate } from "react-router-dom";

function Home() {

    const [equipments, setEquipments] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getEquipments();
    }, []);

    const getEquipments = () => {
        api
            .get("/api/equipments/")
            .then((res) => res.data)
            .then((data) => {
                setEquipments(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteEquip = (id) => {
        api
            .delete(`/api/equipments/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Equipment deleted!");
                else alert("Failed to delete Equipment.");
                getEquipments();
            })
            .catch((error) => alert(error));
    };
    const showEquip = (id) => {

        const selectedEquip = equipments.find(item => item.id === id);
        navigate("/show-equip", { state: { attribute: selectedEquip } })
    };

    return (
        <div>
            <Link to="/add-equip" className="link">
                Adicionar Equipamento
            </Link>
            <EquipmentList rows={equipments}/>    
        </div>
    );
}

export default Home;
