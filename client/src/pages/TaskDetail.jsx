import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const TaskDetail = () => {
  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Task Details
        </Typography>
      </motion.div>
    </Box>
  );
};

export default TaskDetail;
