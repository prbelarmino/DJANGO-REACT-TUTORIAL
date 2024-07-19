import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import OSDetails from "../components/OSDetails";
import {divideDateByInteger} from "../components/dateUtils";
import {OrderDictionary} from "../headers/ModelDictionaries"
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Box, Button, Grid, TextField, MenuItem, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

function ServiceOrderView() {

    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({equip: {owner:{client: {}}}});
    const isNonMobile = useMediaQuery("(min-width:600px)");
    
    useEffect(() => {
        getServiceOrder();
    }, []);

    const getServiceOrder = () => {

        api
            .get(`/api/fullserviceorder/${id}/`)
            .then((res) => {
                setOrder(res.data);
            })
            .catch((err) => alert(err));
    
    };

    const editServiceOrder = async (values) => {

        setLoading(true);
        //e.preventDefault();
        try {
            const updated_order = {
                number: order.number,
                state: "FECHADA",
                requester: order.requester,
                service_type: order.service_type,
                closed_at:  new Date(),
                priority: order.priority,
                title: order.title,
                issue_description: order.issue_description,
                solution: values.solution,
                equip: order.equip.id, 
            }
            const res = await api.put(`/api/serviceorders/${id}/`, updated_order)
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
                Ordem de Serviço Nº {order.number} | {order.state}
            </Typography>
            
            <OSDetails data={order}/>
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
    solution: yup.string().required("required"),
});
export default ServiceOrderView;





