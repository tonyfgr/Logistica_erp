import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Card from "@mui/material/Paper";
import { useState, useCallback, useReducer } from "react";
import { CardHeader, Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import { alpha} from "@mui/material/styles";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const dragReducer = (state, action) => {
  return state;
}
const Estados = () => {
  // const [state, dispatch] = useReducer(dragReducer, )
  const onDragEnd = useCallback((result) => {}, []);

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}></DragDropContext>
    </div>
  );
};
export default Estados;