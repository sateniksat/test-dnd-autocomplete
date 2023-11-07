import React,{useState} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  List,
  ListItemButton,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteItem from "./DeleteItem";
import EditPlace from "./EditPlace";


function ListOfPlaces(props) {
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(props.listOfPlaces);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    props.setListOfPlaces(items);
  }
  const [openModalfirst, setOpenModalfirst] = useState("CLOSE");
  const [openModalsecond, setOpenModalsecond] = useState("CLOSE");
  const [dataModal, setDataModal] = useState({});



  const handleOpenModal = (row, action) => {
    switch (action) {
      case "edit":
        setOpenModalsecond("OPEN");
        setDataModal({ status: action, data: row });
        break;
      case "delete":
        setOpenModalfirst("OPEN");
        setDataModal({ status: action, data: row });
        break;
      default:
        break;
    }
  };

  const deleteItemHandeler = (deleteItem) => {
    const newArray = props.listOfPlaces.filter(
      (item) => deleteItem.id !== item.id
    );
    props.setListOfPlaces(newArray);
  };

  const handlePlaceEdit=(place)=>{
    const indexInList=props.listOfPlaces.findIndex(item=>place.id===item.id);
    // console.log(indexInList)
    const items = Array.from(props.listOfPlaces);
    items[indexInList]=place;
    // console.log(items)
    props.setListOfPlaces(items)
  }
  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {props.listOfPlaces.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListItemAvatar>
                          <Avatar>{index + 1}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          secondary="استان"
                          primary={item.province.name}
                        />
                        <ListItemText
                          secondary="شهر"
                          primary={item.city.name}
                        />
                        <Button
                          variant="contained"
                          color="success"
                          sx={{ mx: 1 }}
                          onClick={() => handleOpenModal(item, "edit")}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleOpenModal(item, "delete")}
                        >
                          <DeleteOutlineIcon />
                        </Button>
                      </ListItemButton>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <DeleteItem
        title="حذف"
        place={dataModal.data }
        ModalWidth={"50%"}
        deleteMethod={deleteItemHandeler}
        setOpenModal={setOpenModalfirst}
        status={openModalfirst}
      />
      <EditPlace
        title="ویرایش"
        ModalWidth={"65%"}
        place={dataModal.data }
        handlePlaceEdit={handlePlaceEdit}
        setOpenModal={setOpenModalsecond}
        status={openModalsecond}
      />
    </>
  );
}

export default ListOfPlaces;
