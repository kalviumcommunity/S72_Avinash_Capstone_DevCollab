import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 700,
                mb: 2,
                color: "text.primary",
              }}
            >
              Streamline Your Workflow
              <br />
              <Box component="span" sx={{ color: "primary.main" }}>
                with
              </Box>
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", md: "4rem" },
                fontWeight: 700,
                mb: 3,
                color: "text.primary",
              }}
            >
              DevCollab
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                mb: 4,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Empower your team with our intuitive project management solution.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                Get Started
              </Button>
              <Button
                component="a"
                href="#features"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
