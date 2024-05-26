import { Box, Button, TextField, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import { useState } from "react";

//function EquipmentForm(){
const RegistrationForm = () =>{
  
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {

    setLoading(true);
    //e.preventDefault();

    try {
        const res = await api.post("/api/user/register/", { ...values})
        navigate("/")
        
    } catch (error) {
        alert(error)
    } finally {
        setLoading(false)
    }
  };
  return (
    <Box m="20px">
      <Header title="Registro" subtitle="Registrar novo usuario" />
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
                label="Nome(s)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                name="first_name"
                error={!!touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sobrenome(s)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                error={!!touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Função"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.function}
                name="function"
                error={!!touched.function && !!errors.function}
                helperText={touched.function && errors.function}
                sx={{ gridColumn: "span 2" }}
                select
              >
                <MenuItem value="Gerente">Gerente</MenuItem>
                <MenuItem value="Supervisor">Supervisor</MenuItem>
                <MenuItem value="Técnico">Técnico</MenuItem>
              </TextField>        
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Numero de Telefone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone_number}
                name="phone_number"
                error={!!touched.phone_number && !!errors.phone_number}
                helperText={touched.phone_number && errors.phone_number}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Matricula"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.matriculation}
                name="matriculation"
                error={!!touched.matriculation && !!errors.matriculation}
                helperText={touched.matriculation && errors.matriculation}
                sx={{ gridColumn: "span 1" }}
                />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Locação"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Usuario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Senha"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
             
            </Box>
            {/* <Box>
              {loading && <LoadingIndicator />}
            </Box> */}
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
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string()
            .email('Invalid email')
            .required('Email is required'),
  function: yup.string().required("required"),
  phone_number: yup.string()
                    .matches(phoneRegExp, 'Must be only digits')
                    .min(10, 'Too short')
                    .max(15, 'Too long')
                    .required('Phone number is required'),
  matriculation: yup.string()
                    .matches(/^[0-9]+$/, 'Must be only digits')
                    .min(4, 'Too short')
                    .max(10, 'Too long')
                    .required('Field is required'),
  age: yup.number().typeError('Age must be a number')
                    .integer('Age must be an integer')
                    .min(18, 'Age must be at least 18')
                    .max(80, 'Age must not exceed 80'),
  location: yup.string().required("required"),
  username: yup.string().required("required"),
  password: yup.string().required("required"),

});
const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    function: "",
    phone_number: "",
    matriculation: "",
    age: "",
    location: "",
    username: "",
    password: "",
};

export default RegistrationForm;
