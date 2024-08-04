import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import Test from "../components/Test"
import OSChart from "../components/OSChart"
import { Container, Typography, Box } from '@mui/material';
function Home() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dataset = [
      {
        "country": "AD",
        "hot dog": 42,
        "hot dogColor": "hsl(103, 70%, 50%)",
        "burger": 8,
        "burgerColor": "hsl(229, 70%, 50%)",
        "sandwich": 66,
        "sandwichColor": "hsl(230, 70%, 50%)",
        "kebab": 9,
        "kebabColor": "hsl(65, 70%, 50%)",
        "fries": 171,
        "friesColor": "hsl(251, 70%, 50%)",
        "donut": 96,
        "donutColor": "hsl(128, 70%, 50%)"
      },
      {
        "country": "AE",
        "hot dog": 57,
        "hot dogColor": "hsl(20, 70%, 50%)",
        "burger": 133,
        "burgerColor": "hsl(226, 70%, 50%)",
        "sandwich": 180,
        "sandwichColor": "hsl(342, 70%, 50%)",
        "kebab": 31,
        "kebabColor": "hsl(167, 70%, 50%)",
        "fries": 112,
        "friesColor": "hsl(213, 70%, 50%)",
        "donut": 36,
        "donutColor": "hsl(284, 70%, 50%)"
      },
      {
        "country": "AF",
        "hot dog": 94,
        "hot dogColor": "hsl(170, 70%, 50%)",
        "burger": 93,
        "burgerColor": "hsl(310, 70%, 50%)",
        "sandwich": 149,
        "sandwichColor": "hsl(104, 70%, 50%)",
        "kebab": 78,
        "kebabColor": "hsl(261, 70%, 50%)",
        "fries": 167,
        "friesColor": "hsl(71, 70%, 50%)",
        "donut": 95,
        "donutColor": "hsl(111, 70%, 50%)"
      },
      {
        "country": "AG",
        "hot dog": 131,
        "hot dogColor": "hsl(177, 70%, 50%)",
        "burger": 91,
        "burgerColor": "hsl(80, 70%, 50%)",
        "sandwich": 24,
        "sandwichColor": "hsl(358, 70%, 50%)",
        "kebab": 63,
        "kebabColor": "hsl(67, 70%, 50%)",
        "fries": 78,
        "friesColor": "hsl(333, 70%, 50%)",
        "donut": 172,
        "donutColor": "hsl(313, 70%, 50%)"
      },
      {
        "country": "AI",
        "hot dog": 138,
        "hot dogColor": "hsl(136, 70%, 50%)",
        "burger": 154,
        "burgerColor": "hsl(281, 70%, 50%)",
        "sandwich": 97,
        "sandwichColor": "hsl(86, 70%, 50%)",
        "kebab": 114,
        "kebabColor": "hsl(52, 70%, 50%)",
        "fries": 75,
        "friesColor": "hsl(162, 70%, 50%)",
        "donut": 194,
        "donutColor": "hsl(142, 70%, 50%)"
      },
      {
        "country": "AL",
        "hot dog": 92,
        "hot dogColor": "hsl(16, 70%, 50%)",
        "burger": 61,
        "burgerColor": "hsl(148, 70%, 50%)",
        "sandwich": 182,
        "sandwichColor": "hsl(335, 70%, 50%)",
        "kebab": 49,
        "kebabColor": "hsl(21, 70%, 50%)",
        "fries": 70,
        "friesColor": "hsl(155, 70%, 50%)",
        "donut": 119,
        "donutColor": "hsl(182, 70%, 50%)"
      },
      {
        "country": "AM",
        "hot dog": 45,
        "hot dogColor": "hsl(357, 70%, 50%)",
        "burger": 55,
        "burgerColor": "hsl(282, 70%, 50%)",
        "sandwich": 79,
        "sandwichColor": "hsl(86, 70%, 50%)",
        "kebab": 125,
        "kebabColor": "hsl(110, 70%, 50%)",
        "fries": 90,
        "friesColor": "hsl(108, 70%, 50%)",
        "donut": 104,
        "donutColor": "hsl(56, 70%, 50%)"
      }
    ]
    return (
      
      <Box
            //ml={2}
            width="80%"
            height={500}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px',
              justifyContent: 'space-between',
            }}
          >

        <Typography
          variant="h3"
          color={colors.primary[100]}  
          sx={{ m: "0 15px 0 0"}}
        >
          Panorama do Estado das OS
        </Typography>
        <OSChart data={dataset} />
      </Box>
    );
}

export default Home;
