import "./index.css";
import "../../../fonts/poppins.ttf";
import { alpha } from "@mui/material/styles";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Paper,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box
} from "@mui/material";

//Componentes
import { useState, useEffect, useContext } from "react";
import { Tabla } from "./complements";


import { useRef } from "react";


const Categorias = () => {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});
  const [itemView, setItemView] = useState({});

  const render = useRef(true);
  const [renderizar, setRenderizar] = useState(true);
  const [fields, setFields] = useState({});
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
  const handleClean = () => {
    searchform.reset();
    setFields({})
  };

  return (
    <section>
      <div className="container">
        
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <Tabla
              fields={fields}
              render={render}
              renderizar={renderizar}
              setRenderizar={setRenderizar}
              setOpenModal={setOpenModal}
              setItem={setItem}
              setItemView={setItemView}
            />
          </Box>
        </Box>
      </div>
    </section>
  );
};
export default Categorias;
