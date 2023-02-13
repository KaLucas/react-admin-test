import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

export const Dashboard = () => (
  <Card>
    <CardHeader title="Hi and welcome!" align="center" />
    <CardContent>
      <Grid container justifyContent="center">
        <img
          src="https://media.tenor.com/mhLPO2VldCkAAAAC/0001.gif"
          width="300px"
        />
      </Grid>
      <Typography sx={{ mt: 10 }}>
        Welcome to my Dashboard! Here you'll be able to see a little bit of my
        learnings about{" "}
        <Typography fontWeight="bold" display="inline">
          React-Admin, Material UI, Data Provider and RTK Query
        </Typography>
        .
      </Typography>
      <Typography component="p" sx={{ mt: 2 }}>
        At the{" "}
        <Typography fontWeight="bold" display="inline">
          Marvel Characters
        </Typography>
        menu, I'm using Data Provider only to fetch results and show the details
      </Typography>
      <Typography component="p" sx={{ mt: 2 }}>
        At the{" "}
        <Typography fontWeight="bold" display="inline">
          Random Posts
        </Typography>{" "}
        menu, I'm using RTK Query with all the CRUD possibilities
      </Typography>
      <Typography component="p" sx={{ mt: 2 }}>
        Enjoy and thank you for checking it out!
      </Typography>
      <Typography component="p">Karina</Typography>
    </CardContent>
  </Card>
);
