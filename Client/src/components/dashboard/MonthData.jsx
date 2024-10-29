import * as React from 'react';
import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import http from '../../utils/http';

function MonthData() {
  const [barData, setBarData] = useState(Array(30).fill(0)); 
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get('/url');
        const urlCreated = res.data; 

        const dailyCounts = Array(30).fill(0);


        urlCreated.forEach((item) => {
          if (item.dateCreated) {
            const date = new Date(item.dateCreated);
            const day = date.getUTCDate(); 
            if (day >= 1 && day <= 30) {
              dailyCounts[day - 1]++; // -1 to match array index
            }
          }
        });

        setBarData(dailyCounts);
        setTotalCount(urlCreated.length); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
  const currentMonth = monthNames[new Date().getMonth()]; 

  const chartSetting = {
    yAxis: [
      {
        label: `Total URLs Created`, 
        max: 30, 
      },
    ],
    series: [{ 
      dataKey: 'count', 
      label: `URL Creation Count: ${totalCount}` 
    }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
    },
  };


  const formattedData = barData.map((count, index) => ({
    day: index + 1, 
    count,
  }));

  return loading ? (
    <div>Loading...</div>
  ) : (
    <BarChart
      dataset={formattedData}
      xAxis={[{ 
        scaleType: 'band', 
        dataKey: 'day', 
        label: currentMonth 
      }]}
      {...chartSetting}
    />
  );
}

export default MonthData;
