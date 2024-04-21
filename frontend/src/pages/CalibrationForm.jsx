import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import api from "../api";
import { useNavigate, useLocation} from "react-router-dom";
import { tokens } from "../theme";

//function CalibrationForm(){
const CalibrationForm = () =>{
  
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const equip = location.state.attribute;
    const equip_id = equip.id;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const addCalibration = (values) => {

        api
            .post("/api/calibrations/", {...values, equip_id})
            .then((res) => {
                if (res.status === 201)
                {
                    alert("Calibratrion added!");
                    navigate("/show-equip", { state: { attribute: equip } })
                } 
                else alert("Failed to create Calibratrion");
            })
            .catch((err) => alert(err));
    };

  return (
    <Box m="20px">

      <Header title="Adicionar Calibração" subtitle="Formulario para adicionar Calibração no sistema" />
      <Formik
        onSubmit={addCalibration}
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
                    label="Solicitante"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.requester}
                    name="requester"
                    error={!!touched.requester && !!errors.requester}
                    helperText={touched.requester && errors.requester}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
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
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Validade"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.expiration}
                    name="expiration"
                    error={!!touched.expiration && !!errors.expiration}
                    helperText={touched.expiration && errors.expiration}
                    sx={{ gridColumn: "span 4" }}
                />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
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
    number: yup.string().required("required"),
    requester: yup.string().required("required"),
    executor: yup.string().required("required"),
    expiration: yup.string().required("required"),
});
const initialValues = {
    number: "",
    requester: "",
    executor: "",
    expiration: "",
};

export default CalibrationForm;
