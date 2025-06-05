import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

const Companies = () => {
  const companies = [
    { name: "Amazon", logo: "/companies/amazon.svg" },
    { name: "Atlassian", logo: "/companies/atlassian.svg" },
    { name: "Google", logo: "/companies/google.webp" },
    { name: "IBM", logo: "/companies/ibm.svg" },
    { name: "Meta", logo: "/companies/meta.svg" },
    { name: "Microsoft", logo: "/companies/microsoft.webp" },
    { name: "Netflix", logo: "/companies/netflix.png" },
    { name: "Uber", logo: "/companies/uber.svg" },
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: "grey.50",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
            fontWeight: 700,
          }}
        >
          Trusted by Industry Leaders
        </Typography>
        <Grid container spacing={4}>
          {companies.map((company, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Box
                    component="img"
                    src={company.logo}
                    alt={company.name}
                    sx={{
                      height: 48,
                      objectFit: "contain",
                      filter: "grayscale(100%)",
                      opacity: 0.7,
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        filter: "grayscale(0%)",
                        opacity: 1,
                      },
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Companies;
