import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Box, Paper, Typography, Card, CardContent } from "@mui/material";

const KanbanBoard = ({ columns, boardConfig, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        {boardConfig.map((col) => (
          <Droppable droppableId={col.id} key={col.id}>
            {(provided, snapshot) => (
              <Paper
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  flex: 1,
                  minHeight: 400,
                  p: 2,
                  bgcolor: snapshot.isDraggingOver ? "grey.100" : "grey.50",
                }}
                elevation={3}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  {col.name}
                </Typography>
                {(columns[col.id] || []).map((task, idx) => (
                  <Draggable
                    draggableId={String(task.id || task._id)}
                    index={idx}
                    key={task.id || task._id}
                  >
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          mb: 2,
                          boxShadow: snapshot.isDragging ? 6 : 1,
                          bgcolor: "white",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 500 }}
                          >
                            {task.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {task.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default KanbanBoard;
