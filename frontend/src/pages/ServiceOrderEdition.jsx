import { Box, Button, Autocomplete, TextField, MenuItem, useTheme } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import api from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tokens } from "../theme";
import { useEffect, useState } from "react";


//function ServiceOrderEdition(){
const ServiceOrderEdition = () =>{
  
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const data = JSON.parse(searchParams.get('order'));
  const [team, setTeam] = useState([]);

  const initialValues = {
    number: data.number,
    state: data.state,
    requester: data.requester,
    executor: data.executor,
    service_type: data.service_type,
    closed_at: data.closed_at,
    priority: data.priority,
    title: data.title,
    issue_description: data.issue_description,
    created_at: data.created_at,
    equip: data.equip,
  };
  useEffect(() => {
    getTeam();
  }, []);

  const editServiceOrder = async (values) => {

    setLoading(true);
    
    let sentValues = values;
    //e.preventDefault();
    try {

        const res = await api.put(`/api/serviceorders/${data.id}/`, { ...sentValues})
        alert("ServiceOrder updated!");
        navigate("/orders")
        
    } catch (error) {
        alert(error)
    } finally {
        setLoading(false)
    }
  };

  const getTeam = (event) => {
    // Define query parameter
    const queryParams = {
        field: "function",
        value: "Técnico",
      // Add more parameters as needed
    };
    api
        .get('/api/user/register/',{ params: queryParams })
        .then((res) => {
          const names = res.data.map(item => item.first_name + " " + item.last_name);
          names.sort();
          setTeam(names);
          
        })
        .catch((err) => alert(err));

};
  return (
    <Box m="20px">
      <Header title="Editar Ordem de Serviço" subtitle="Formulario para editar Ordem de Serviço" />
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={editServiceOrder}
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
          <Form onSubmit={handleSubmit}>
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
              {/* <TextField
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
              </TextField>  */}
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
                  sx={{ gridColumn: "span 2" }}
              />
              <Autocomplete
                options={team}
                //getOptionLabel={(option) => option || ""}
                name="executor"
                onChange={(e, value) => setFieldValue("executor", value)}
                value={values.executor}
                sx={{ gridColumn: "span 2"}}
                renderInput={(params) => (
                  <TextField {...params} 
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Técnico Executor" 
                  />
                )}
              />
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
                  sx={{ gridColumn: "span 2" }}
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
              />
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
                  sx={{ gridColumn: "span 2" }}
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
                  Editar
              </Button>
            </Box>
          </Form>
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


export default ServiceOrderEdition;
