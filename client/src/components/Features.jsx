import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "Intuitive Kanban Boards",
      description:
        "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
    },
    {
      title: "Powerful Sprint Planning",
      description:
        "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
    },
    {
      title: "Comprehensive Reporting",
      description:
        "Gain insights into your team's performance with detailed, customizable reports and analytics.",
    },
  ];

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: { xs: 6, md: 8 },
            fontWeight: 700,
          }}
        >
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    bgcolor: "grey.50",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
