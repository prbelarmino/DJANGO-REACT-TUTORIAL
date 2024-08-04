import api from "../api";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useState, useEffect } from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
function OSChart()
{

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ordersStats, setOrderStats] = useState([]);
  useEffect(() => {
    getServiceOrders();
  }, []);

  const getServiceOrders = () => {

    api
        .get('/api/serviceorders/stats/')
        .then((res) => {
          const colorsStats = res.data.map(stats => ({
            ...stats,
            "OS FechadasColor": "#61cdbb",
            "OS AbertasColor": "#e25c3b",
          }));
          setOrderStats(colorsStats);
          //console.log(colorsStats)

        })
        .catch((err) => alert(err));
  };

  const CustomAxisBottom = ({ x, y, value }) => {
    const words = value.split(' '); // Split the label into words
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                    fill: colors.primary[100],
                    fontSize: 12,
                }}
            >
                {words.map((word, i) => (
                    <tspan key={i} x="0" dy={`${1.15}em`}>
                        {word}
                    </tspan>
                ))}
            </text>
        </g>
    );
  };
  // Define a custom tooltip component
  const CustomTooltip = ({ id, value, color, data  }) => (
    <div style={{
        padding: '5px 10px',
        backgroundColor: colors.primary[400],
        color: colors.primary[100], // Text color
        borderRadius: '3px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    }}>
        <strong>{data.owner}</strong><br />
        <span>{id}: {value}</span>
    </div>
  );
  return(

    <ResponsiveBar
        data={ordersStats}
        keys={[
          'OS Fechadas',
          'OS Abertas',
        ]}
        indexBy="owner"
        margin={{ top: 50, right: 130, bottom: 80, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        //colors={{ scheme: 'category10' }}
        colors={({id, data}) => data[`${id}Color`]}
        tooltip={CustomTooltip} // Apply the custom tooltip
        theme={{
          axis: {
            fontSize: '14px',
            tickColor: '#eee',
            ticks: {
              line: {
                stroke: "none"
              },
              text: {
                fill: colors.greenAccent[100],
              },
            },
            legend: {
              text: {
                fill: colors.greenAccent[100],
              }
            },
          },
          labels: {
            text: {
                fontSize: 14, // Increase font size
                fontWeight: 'bold',
                fill: theme.palette.background.default, // Label text color
            },
          },
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: colors.primary[700],
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: colors.primary[100],
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        // fill={[
        //     {
        //         match: {
        //             id: 'OS Abertas'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'OS Fechadas'
        //         },
        //         id: 'lines'
        //     }
        // ]}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Proprietário',
            legendPosition: 'middle',
            legendOffset: 70,
            truncateTickAt: 0,
            //format: truncateLabel,
            renderTick: CustomAxisBottom,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0,
            

        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelFontSize="100px"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
          {
            itemTextColor: colors.primary[100], // Funciona
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1,
                        textColor: colors.greenAccent[100],
                    }
                }
            ]
          }
        ]}
        //enableGridX={false} // Disable X-axis grid lines
        //enableGridY={false} // Disable Y-axis grid lines
        
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
  );
};

export default OSChart;
