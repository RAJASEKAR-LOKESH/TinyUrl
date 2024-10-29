import {
    Card,
    Typography,
    Container,
  } from "@mui/material";
  import { useState, useEffect } from 'react';
  import http from '../../utils/http';
  
  function TodayData() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await http.get('/url');
          setUser(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    // Function to count URLs created today
    const countUrlsCreatedToday = () => {
      const today = new Date();
      return user.filter(item => {
        const createdDate = new Date(item.dateCreated);
        // Check if the date matches today's date
        return (
          createdDate.getUTCFullYear() === today.getUTCFullYear() &&
          createdDate.getUTCMonth() === today.getUTCMonth() &&
          createdDate.getUTCDate() === today.getUTCDate()
        );
      }).length;
    };
  
    // Total URLs created
    const totalUrlsCreated = user.length;
    // URLs created today
    const urlsCreatedToday = countUrlsCreatedToday();
  
    return (
      <Container>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Typography
            style={{marginTop:'50px',fontWeight:'bold'}}
            >Total URL Created Today: {urlsCreatedToday > 0 ? urlsCreatedToday : 0}</Typography>
            <Typography
            style={{marginTop:'50px',fontWeight:'bold'}}
            >Total Number of URLs Created: {totalUrlsCreated > 0 ? totalUrlsCreated : 0}</Typography>
          </>
        )}
      </Container>
    );
  }
  
  export default TodayData;
  