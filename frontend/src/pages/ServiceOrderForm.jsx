import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import api from "../api";
import { useNavigate, useLocation } from "react-router-dom";
import { tokens } from "../theme";

//function ServiceOrderForm(){
const ServiceOrderForm = () =>{
  
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const equip_id = location.state.attribute;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const addServiceOrder = (values) => {
        console.log(values)
        api
        .post("/api/serviceorders/", {...values, equip_id})
        .then((res) => {
            if (res.status === 201)
            {
                alert("ServiceOrder created!");
                navigate("/")
            } 
            else alert("Failed to create ServiceOrder.");
        })
        .catch((err) => alert(err));
  };

  return (
    <Box m="20px">
      
      <Header title="Adicionar Ordem de Serviço" subtitle="Formulario para adicionar Ordem de Serviço no sistema" />
      <Formik
        onSubmit={addServiceOrder}
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
                    label="Número"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.type}
                    name="number"
                    error={!!touched.type && !!errors.type}
                    helperText={touched.type && errors.type}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Solicitante"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state}
                    name="requester"
                    error={!!touched.state && !!errors.state}
                    helperText={touched.state && errors.state}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Tecnico Executor"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.owner}
                    name="executor"
                    error={!!touched.owner && !!errors.owner}
                    helperText={touched.owner && errors.owner}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Tipo de Serviço"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.model}
                    name="service_type"
                    error={!!touched.model && !!errors.model}
                    helperText={touched.model && errors.model}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Fechado em"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.manufacturer}
                    name="closed_at"
                    error={!!touched.manufacturer && !!errors.manufacturer}
                    helperText={touched.manufacturer && errors.manufacturer}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Prioridade"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.identification}
                    name="priority"
                    error={!!touched.identification && !!errors.identification}
                    helperText={touched.identification && errors.identification}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Titulo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.serial_number}
                    name="title"
                    error={!!touched.serial_number && !!errors.serial_number}
                    helperText={touched.serial_number && errors.serial_number}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Descrição do Problema"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.serial_number}
                    name="issue_description"
                    error={!!touched.serial_number && !!errors.serial_number}
                    helperText={touched.serial_number && errors.serial_number}
                    sx={{ gridColumn: "span 4" }}
                />
            </Box>
            
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Criar
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
    number: yup.string().required("required"),
    requester: yup.string().required("required"),
    executor: yup.string().required("required"),
    service_type: yup.string().required("required"),
    closed_at: yup.string().required("required"),
    priority: yup.string().required("required"),
    title: yup.string().required("required"),
    issue_description: yup.string().required("required"),
});
const initialValues = {
    number: "",
    requester: "",
    executor: "",
    service_type: "",
    closed_at: "",
    priority: "",
    title: "",
    issue_description: "",
};

export default ServiceOrderForm;
