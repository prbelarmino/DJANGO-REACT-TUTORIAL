import { useState, useEffect } from "react";
import api from "../api";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import EquipmentList from "../components/EquipmentList";
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
                //console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteEquip = (event, params) => {
        api
            .delete(`/api/equipments/delete/${params.id}/`)
            .then((res) => {
                if (res.status === 204) alert("Equipment deleted!");
                else alert("Failed to delete Equipment.");
                getEquipments();
            })
            .catch((error) => alert(error));
    };
    const showEquip = (event, params) => {

        console.log(params.id);
        console.log(equipments);
        const selectedEquip = equipments.find(item => item.id === params.id);
        console.log(selectedEquip);
        navigate("/show-equip", { state: { attribute: selectedEquip } })
    };

    return (
        <div>
            <Link to="/add-equip" className="link">
                Adicionar Equipamento
            </Link>
            <EquipmentList 
                rows={equipments}
                onDelete={deleteEquip}
                onViewMore={showEquip}
            />    
        </div>
    );
}

export default Home;
