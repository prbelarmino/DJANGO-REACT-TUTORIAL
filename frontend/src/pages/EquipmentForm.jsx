import { Box, Button, TextField, Autocomplete, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import { useState, useEffect } from "react";

//function EquipmentForm(){
const EquipmentForm = () =>{
  
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
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
  const addEquipment = (values) => {
    
    const equip = {...values};
    equip.owner = values.owner.id;
    setLoading(true);
    api
      .post("/api/equipments/create/", equip)
      .then((res) => {
            
            if (res.status === 201)
            {
                alert("Equipment added!");
                navigate("/equipments")
            } 
            else alert("Failed to add Equipment.");
            
        })
        .catch((err) => alert(err.response.data.serial_number ? err.response.data.serial_number : err));
    setLoading(false);
  };

  return (
    <Box m="20px">
      <Header title="Adicionar Equipamento" subtitle="Formulario para adicionar equipamento no sistema" />
      <Formik
        onSubmit={addEquipment}
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
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
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
              >
                Adiconar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
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
const initialValues = {
    type: "",
    state: "",
    owner: "",
    model: "",
    manufacturer: "",
    identification: "",
    serial_number: "",
};

export default EquipmentForm;
