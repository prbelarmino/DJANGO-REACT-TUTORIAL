import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useSearchParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CardInfo from "../components/CardInfo";
import {divideDateByInteger} from "../components/dateUtils";
import {OrderDictionary} from "../headers/ModelDictionaries"
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Box, Button, Grid, TextField, MenuItem, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

function ServiceOrderView() {

    const theme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const order = JSON.parse(searchParams.get('order'));
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const orderBasicInfo = ["number", "state", "requester", "executor", "service_type", "issue_description", "solution"];

    
    const editServiceOrder = async (values) => {

        setLoading(true);
        //e.preventDefault();
        try {
    
            const closed_at = new Date();
            const state = "FECHADA";
            const res = await api.put(`/api/serviceorders/${order.id}/`, { ...values, state, closed_at})
            alert("ServiceOrder updated!");
            navigate("/orders")
            
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
      };
    
    return (
        <Box>
            <Typography sx={{ fontSize: 30, m: "0px 0px 50px 20px"}} color="text.secondary" gutterBottom>
                    {order.number} {order.state}
            </Typography>
            
            <CardInfo data={order} keysToDisplay={orderBasicInfo} dictionary={OrderDictionary}/>
            {order.state != "FECHADA" && (
                <Box width={'500px'} m={"20px"}>
                    <Formik
                        onSubmit={editServiceOrder}
                        initialValues={order}
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
                            //gap="30px"
                            //gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                            >
                                <TextField
                                    variant="filled"
                                    multiline
                                    rows={4}
                                    inputProps={{ maxLength: 30 }}
                                    label="Descrição do Serviço"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.solution}
                                    name="solution"
                                    style={{height: '100px', 
                                            //backgroundColor: theme.palette.primary.shadow, 
                                            //color: theme.palette.text.primary
                                        }}
                                />
                            </Box>
                            
                            <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" 
                                    color="secondary" 
                                    variant="contained"
                                    disabled={loading}
                            >
                                Fechar OS
                            </Button>
                            </Box>

                        </form>
                        )}
                    </Formik>
                </Box>
                )
            }
        </Box>
    );
}
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const checkoutSchema = yup.object().shape({
    issue_description: yup.string().required("required"),
});
export default ServiceOrderView;





