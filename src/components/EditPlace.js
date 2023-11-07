import React, { useEffect, useState, memo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ModalHOC from "./ModalHOC";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

function EditPlace(props) {
  const citiesRedux = useSelector((state) => state?.city);
  const provincesRedux = useSelector((state) => state?.province);


  const [valueProvince, setValueProvince] = useState(props.place.province);
  const [valueCity, setValueCity] = useState(props.place.city);

  const [cityFiltered, setCityFiltered] = useState([]);
  const [provinceFiltered, setProvinceFiltered] = useState([]);


  useEffect(()=>{
    const newArray = citiesRedux.filter((item) => item.provinceId === props.place.province.id);
      setCityFiltered(newArray);
    setProvinceFiltered(provincesRedux);
  },[provincesRedux,props.place.province.id,citiesRedux])

  const handleChangeProvince = (newValue) => {
    setValueProvince(newValue);
    // console.log(newValue);
    if (newValue === null) {
      setCityFiltered(citiesRedux);
      setProvinceFiltered(provincesRedux);
      setValueProvince(null);
      setValueCity(null);
    } else {
      setValueCity(null);
      const newArray = citiesRedux.filter((item) => item.provinceId === newValue.id);
      setCityFiltered(newArray);
    }
  };

  const handleChangeCity = (newValue) => {
    // console.log(newValue);
    if (newValue === null) {
      setValueCity(null);
    } else {
      setValueCity(newValue);
      const newProvince = provincesRedux.find(
        (item) => newValue.provinceId === item.id
      );
      setValueProvince(newProvince);
    }
  };

const handleEditClick=()=>{
  // console.log({province:valueProvince,city:valueCity,id:props.place.id})
  props.handlePlaceEdit({province:valueProvince,city:valueCity,id:props.place.id})

  props.handleClose()
}

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="sm"
        dir="rtl"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight:"70vh"
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", pt: 6 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={provinceFiltered}
            value={valueProvince}
            sx={{ width: 300, mx: 1 }}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              handleChangeProvince(newValue);
            }}
            renderOption={(props, option) => (
              <Box component="li" key={option.id} {...props}>
                {option.name}
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label="استان" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={valueCity}
            options={cityFiltered}
            onChange={(event, newValue) => {
              handleChangeCity(newValue);
            }}
            sx={{ width: 300, mx: 1 }}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component="li" key={option.id} {...props}>
                {option.name}
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label="شهر" />}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ mx: 1 }}
            onClick={()=>handleEditClick()}
          >
            <DoneIcon />
          </Button>
          <Button
            variant="outlined"
            onClick={()=>props.handleClose()}
          >
            <CloseIcon />
          </Button>
        </Box>
   
      </Container>
    </React.Fragment>
  );
}
export default memo(ModalHOC(EditPlace));
