import { Box, Button, Grid, TextField, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import api from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tokens } from "../theme";
import { useState } from "react";

//function EquipmentEdition(){
const EquipmentEdition = () =>{
  
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const data = JSON.parse(searchParams.get('equip'));
  const initialValues = {
    type: data.type,
    state: data.state,
    owner: data.owner,
    model: data.model,
    manufacturer: data.manufacturer,
    identification: data.identification,
    serial_number: data.serial_number,
  };

  const editEquipment = async (values) => {

    setLoading(true);
    
    
    //e.preventDefault();
    try {

        const added_by = data.added_by;
        const created_at = data.created_at;
        const res = await api.put(`/api/equipments/${data.id}/`, { ...values, created_at, added_by})
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
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Proprietario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.owner}
                name="owner"
                error={!!touched.owner && !!errors.owner}
                helperText={touched.owner && errors.owner}
                sx={{ gridColumn: "span 4" }}
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
                sx={{ gridColumn: "span 4" }}
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
                sx={{ gridColumn: "span 4" }}
              />
              
            </Box>
            
            <Box display="flex" justifyContent="end" mt="20px">

            <Button type="submit" 
                    color="secondary" 
                    variant="contained"
                    disabled={loading}
                    sx={{ mr: 2 }}
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
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    type: yup.string().required("required"),
    state: yup.string().required("required"),
    owner: yup.string().required("required"),
    model: yup.string().required("required"),
    manufacturer: yup.string().required("required"),
    identification: yup.string().required("required"),
    serial_number: yup.string().required("required"),
});


export default EquipmentEdition;
