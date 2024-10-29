import {
    Card,
    Typography,
    Container,
    Grid,
  } from "@mui/material";
  import MonthData from "./MonthData";
  import TodayData from "./TodayData";
  
  function Dashboard() {
      const date = new Date(Date.now());
      const day = date.toLocaleString('default', { weekday: 'long' });
      const month = date.toLocaleString('default', { month: 'long' });
  
      return (
          <Container
              maxWidth="xl"
              sx={{
                  mt: 0,
                  pt: 4,
                  height: "auto",
              }}
          >
              <Grid container spacing={4} justifyContent="center">
                  <Grid item xs={12} sm={6} md={4}>
                      <Card
                          sx={{
                              bgcolor: "#f0f8ff",
                              padding: "10px",
                              textAlign: "center",
                              height: '100%',
                          }}
                      >
                          <Typography style={{ fontWeight: 'bold', marginTop: '10px' }}>URLs CREATED</Typography>
                          <Typography style={{ fontWeight: 'bold', marginTop: '10px' }}>TODAY ({day.toUpperCase()})</Typography>
                          <TodayData />
                      </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={8}>
                      <Card
                          sx={{
                              bgcolor: "#f0f8ff",
                              padding: "10px",
                              textAlign: "center",
                              height: '100%',
                          }}
                      >
                          <Typography style={{ fontWeight: 'bold', marginTop: '10px' }}>URLs CREATED</Typography>
                          <Typography style={{ fontWeight: 'bold', marginTop: '10px' }}>{month.toUpperCase()}</Typography>
                          <MonthData />
                      </Card>
                  </Grid>
              </Grid>
          </Container>
      );
  }
  
  export default Dashboard;
  