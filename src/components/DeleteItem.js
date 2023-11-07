import React from "react";
import { Typography, Box, Button } from "@mui/material";
import ModalHOC from "./ModalHOC";

export function ProductDelete(props) {
  const handledelete = () => {
    props.deleteMethod(props.place);
    props.handleClose();
  };
  return (
    <Box dir="rtl" sx={{ mt: "2%" }}>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        آیا مطمئن هستید که <strong> {props.place.province.name} {props.place.city.name} </strong> حذف شود؟
      </Typography>
      <Box
        sx={{
          width: "100%",
          display:"flex",
          justifyContent:"flex-end"
        }}
      >
        <Button variant="contained" onClick={handledelete} color="primary">
          بله
        </Button>
        <Button variant="outlined" onClick={props.handleClose} sx={{mx:1}} color="error">
          خیر
        </Button>
      </Box>
    </Box>
  );
}
export default ModalHOC(ProductDelete);