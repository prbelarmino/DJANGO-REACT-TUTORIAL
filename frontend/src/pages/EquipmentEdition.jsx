import { Box, Button, Autocomplete, TextField, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../theme";
import { useState, useEffect } from "react";

//function EquipmentEdition(){
const EquipmentEdition = () =>{
  
  const theme = useTheme();
  const [equipment, setEquipment] = useState({});
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [valuesFlag, setValuesFlag] = useState(false);
  const { id } = useParams();
  
  const initialValues = {
    type: equipment.type,
    state: equipment.state,
    owner: equipment.owner,
    model: equipment.model,
    manufacturer: equipment.manufacturer,
    identification: equipment.identification,
    serial_number: equipment.serial_number,
  };
  //console.log(initialValues)
  useEffect(() => {
    getEquipment();
    getLocations();

  }, []);
  const getLocations = (event) => {
    // Define query parameter
    api
        .get('/api/basiclocations/')
        .then((res) => {
          const sortedData = res.data.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });

          setLocations(sortedData);
        })
        .catch((err) => alert(err));

  };
  const getEquipment = (event) => {

    api
        .get(`/api/equipments/retrieve/${id}/`)
        .then((res) => {
          setEquipment(res.data);
          setValuesFlag(true);
        })
        .catch((err) => alert(err));

};

  const editEquipment = async (values) => {

    setLoading(true);
    try {

        const equip = {...values};
        equip.owner = values.owner.id;
        const res = await api.put(`/api/equipments/update/${equipment.id}/`, equip)
        alert("Equipment updated!");
        navigate("/equipments")
        
    } catch (error) {
        alert(error)
    } finally {
        setLoading(false)
    }
  };

  return (
    <Box m="20px">
      <Header title="Editar Equipamento" subtitle="Formulario para editar equipamento" />
      {valuesFlag && (
      <Formik
        onSubmit={editEquipment}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tipo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="type"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Estado"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name="state"
                error={!!touched.state && !!errors.state}
                helperText={touched.state && errors.state}
                sx={{ gridColumn: "span 2" }}
                select
                >
                <MenuItem value="ATIVO">Ativo</MenuItem>
                <MenuItem value="INATIVO">Inativo</MenuItem>
              </TextField>
              <Autocomplete
                options={locations}
                getOptionLabel={(option) => option.name || ""}
                name="owner"
                onChange={(e, value) => setFieldValue("owner", value)}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                value={values.owner}
                sx={{ gridColumn: "span 4"}}
                renderInput={(params) => (
                  <TextField {...params} 
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Proprietário" 
                  />
                )}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Modelo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.model}
                name="model"
                error={!!touched.model && !!errors.model}
                helperText={touched.model && errors.model}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Fabricante"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.manufacturer}
                name="manufacturer"
                error={!!touched.manufacturer && !!errors.manufacturer}
                helperText={touched.manufacturer && errors.manufacturer}
                sx={{ gridColumn: "span 4" }}
            />
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Identificação"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.identification}
                name="identification"
                error={!!touched.identification && !!errors.identification}
                helperText={touched.identification && errors.identification}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Numero de Serie"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.serial_number}
                name="serial_number"
                error={!!touched.serial_number && !!errors.serial_number}
                helperText={touched.serial_number && errors.serial_number}
                sx={{ gridColumn: "span 2" }}
              />
              
            </Box>
            
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" 
                      color="secondary" 
                      variant="contained"
                      disabled={loading}
                      sx={{ mr: 2 }}
                      //onClick={(values) => {console.log(values)} }
              >
                Editar
              </Button>
              <Button color="secondary" 
                      variant="contained"
                      disabled={loading}
                      sl={{ ml: 2 }}
                      onClick={() => {navigate("/equipments");} }
              >
                Cancelar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      )}
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    type: yup.string().required("required"),
    state: yup.string().required("required"),
    owner: yup.object().shape({
      id: yup.number().required(),
      name: yup.string().required(),
    }).nullable().required('required'),
    model: yup.string().required("required"),
    manufacturer: yup.string().required("required"),
    identification: yup.string().required("required"),
    serial_number: yup.string().required("required"),
});


export default EquipmentEdition;
