import { Box, Button, TextField, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

//function ServiceOrderForm(){
const ServiceOrderForm = () =>{
  
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    const equip = id; //adapt to column name
    api
        .post("/api/serviceorders/", {...values, equip})
        .then((res) => {
            
            if (res.status === 201)
            {
                alert("Service Order Created!");
                navigate(`/equipments/${id}`)
            } 
            else alert(res);
        })
        .catch((err) => {
          if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorData = err.response.data;
            let errorMessage = '';
            for (const [field, messages] of Object.entries(errorData)) {
              errorMessage += `${field}: ${messages.join(', ')}\n`;
            }
            alert(errorMessage);
          }
        })
        setLoading(false);
        
    };


  return (
    <Box m="20px">
      
      <Header title="Adicionar Ordem de Serviço" subtitle="Formulario para adicionar Ordem de Serviço no sistema" />
      <Formik
        onSubmit={handleSubmit}
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
                    value={values.number}
                    name="number"
                    error={!!touched.number && !!errors.number}
                    helperText={touched.number && errors.number}
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
                    <MenuItem value="ABERTA">Aberta</MenuItem>
                    <MenuItem value="FECHADA">Fechada</MenuItem>
                  </TextField> 
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Solicitante"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.requester}
                    name="requester"
                    error={!!touched.requester && !!errors.requester}
                    helperText={touched.requester && errors.requester}
                    sx={{ gridColumn: "span 4" }}
                />
                {/* <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Tecnico Executor"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.executor}
                    name="executor"
                    error={!!touched.executor && !!errors.executor}
                    helperText={touched.executor && errors.executor}
                    sx={{ gridColumn: "span 4" }}
                /> */}
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Tipo de Serviço"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.service_type}
                    name="service_type"
                    error={!!touched.service_type && !!errors.service_type}
                    helperText={touched.service_type && errors.service_type}
                    sx={{ gridColumn: "span 2" }}
                    select
                    >
                    <MenuItem value="CORRETIVA">Corretiva</MenuItem>
                    <MenuItem value="CALIBRAÇÃO">Calibração</MenuItem>
                    <MenuItem value="PREVENTIVA">Preventiva</MenuItem>
                  </TextField> 
                {/* <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Fechado em"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.closed_at}
                    name="closed_at"
                    error={!!touched.closed_at && !!errors.closed_at}
                    helperText={touched.closed_at && errors.closed_at}
                    sx={{ gridColumn: "span 4" }}
                /> */}
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Prioridade"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.priority}
                    name="priority"
                    error={!!touched.priority && !!errors.priority}
                    helperText={touched.priority && errors.priority}
                    sx={{ gridColumn: "span 2" }}
                    select
                    >
                    <MenuItem value="URGENTE">Urgente</MenuItem>
                    <MenuItem value="NÃO URGENTE">Não Urgente</MenuItem>
                  </TextField> 

                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Titulo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    name="title"
                    error={!!touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 30 }}
                    variant="filled"
                    type="text"
                    label="Descrição do Problema"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.issue_description}
                    name="issue_description"
                    error={!!touched.issue_description && !!errors.issue_description}
                    helperText={touched.issue_description && errors.issue_description}
                    sx={{ gridColumn: "span 4" }}
                />
            </Box>
            
            <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" 
                      color="secondary" 
                      variant="contained"
                      disabled={loading}
              >
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
    state: yup.string().required("required"),
    requester: yup.string().required("required"),
    //executor: yup.string().required("required"),
    service_type: yup.string().required("required"),
    //closed_at: yup.string().required("required"),
    priority: yup.string().required("required"),
    title: yup.string().required("required"),
    issue_description: yup.string().required("required"),
});
const initialValues = {
    number: "",
    state: "",
    requester: "",
    //executor: "",
    service_type: "",
    //closed_at: "",
    priority: "",
    title: "",
    issue_description: "",
    equip: "",
};

export default ServiceOrderForm;
