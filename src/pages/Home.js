import React, { useEffect, useState, memo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddIcon from "@mui/icons-material/Add";
import ListOfPlaces from "../components/ListOfPlaces";
import { useDispatch } from "react-redux";
import { addCity } from "../redux/citySlice";
import { addProvince } from "../redux/provinceSlice";

function Home() {
  const tokenRedux = useSelector((state) => state?.token);

  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  let URL1 = "http://rezayari.ir:5050/CityAndProvince/GetProvince";
  let URL2 = "http://rezayari.ir:5050/CityAndProvince/GetCity";

  const [valueProvince, setValueProvince] = useState(null);
  const [valueCity, setValueCity] = useState(null);

  const [cityFiltered, setCityFiltered] = useState([]);
  const [provinceFiltered, setProvinceFiltered] = useState([]);


  const [listOfPlaces,setListOfPlaces]=useState([]);


  const dispatch = useDispatch();

  useEffect(() => {
    // axios
    //   .get("http://rezayari.ir:5050/CityAndProvince/GetProvince", {headers: {
    //     "Access-Control-Allow-Origin" : "*",
    //     "Content-type": "Application/json",
    //     "Authorization": `Bearer ${tokenRedux}`
    //     }
    // })
    //   .then((res) => {
    //     const dataJson = res.data;
    //     setdata(dataJson);
    //   })
    //   .catch((error) => alert(error));
    const fetchURL = (url) =>
      axios.get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${tokenRedux}`,
        },
      });
    const promiseArray = [URL1, URL2].map(fetchURL);

    Promise.all(promiseArray)
      .then((data) => {
        // data[0]; // first promise resolved
        // data[1];// second promise resolved
        // console.log(data[0].data);
        // console.log(data[1].data);
        setProvinces(data[0].data);
        setCities(data[1].data);

        setProvinceFiltered(data[0].data);
        setCityFiltered(data[1].data);

        dispatch(addProvince(data[0].data));
        dispatch(addCity(data[1].data));

      })
      .catch((err) => {});
  }, [URL1, URL2, tokenRedux,dispatch]);

  const handleChangeProvince = (newValue) => {
    setValueProvince(newValue);
    // console.log(newValue);
    if (newValue === null) {
      setCityFiltered(cities);
      setProvinceFiltered(provinces);
      setValueProvince(null);
      setValueCity(null);
    } else {
        setValueCity(null);
      const newArray = cities.filter((item) => item.provinceId === newValue.id);
      setCityFiltered(newArray);
    }
  };

  const handleChangeCity = (newValue) => {
    // console.log(newValue);
    if (newValue === null) {
      setValueCity(null);
    } else {
      setValueCity(newValue);
      const newProvince = provinces.find(
        (item) => newValue.provinceId === item.id
      );
      setValueProvince(newProvince);
    }
  };

  const handleAddClick=()=>{
    if(valueCity===null && valueProvince===null ){
        alert("لطفا شهر و استان را انتخاب کنید.");
    }else if(valueCity===null){
        alert("لطفا شهر را انتخاب کنید.");
    }else if(valueProvince===null ){
        alert("لطفا استان را انتخاب کنید.");
    }else{
        setListOfPlaces(prev=>[...prev,{province:valueProvince,city:valueCity,id:`${Date.now()}`}]);
        // console.log({province:valueProvince,city:valueCity,id:`${Date.now()}`});
        //can also use uuid for unique id
        // console.log(listOfPlaces)
    }
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
          justifyContent: "center",
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
            // onClick={()=>handleAddClick()}
            onClick={handleAddClick}
            //   endIcon={<AddIcon />}
          >
            <AddIcon />
          </Button>
        </Box>
        {/* {listOfPlaces.map(item=><div>{item.city.name}  {item.province.name}</div>)} */}
        <ListOfPlaces listOfPlaces={listOfPlaces} setListOfPlaces={setListOfPlaces}/>
      </Container>
    </React.Fragment>
  );
}
export default memo(Home);
