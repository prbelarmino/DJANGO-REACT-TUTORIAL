import { Autocomplete, Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import api from "../api";
import { useNavigate, useParams} from "react-router-dom";
import { tokens } from "../theme";
import { useState, useEffect } from "react";

//function CalibrationForm(){
const CalibrationForm = () =>{
  
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();
    const equip = id;
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [loading, setLoading] = useState(false);
    const [team, setTeam] = useState([]);

    useEffect(() => {
      getTeam();
    }, []);
    const getTeam = (event) => {
      // Define query parameter
      const func = "Técnico"
      const queryParams = {
        func
      };
      api
          .get('/api/team/',{ params: queryParams })
          .then((res) => {
            const names = res.data.map(item => item.fullname);
            names.sort()
            setTeam(names);
            
          })
          .catch((err) => alert(err));
  
    };
    const addCalibration = (values) => {
        setLoading(true);
        api
            .post("/api/calibrations/", {...values, equip})
            .then((res) => {
                setLoading(false);
                if (res.status === 201)
                {
                    alert("Calibratrion added!");
                    navigate(`/equipments/${equip}`)
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
                    label="Validade"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.expiration}
                    name="expiration"
                    error={!!touched.expiration && !!errors.expiration}
                    helperText={touched.expiration && errors.expiration}
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
