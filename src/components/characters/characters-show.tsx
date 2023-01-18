import { useState } from "react";
import { useGetOne, Button, SimpleShowLayout, TextField, ArrayField, Datagrid } from "react-admin";
import { Drawer } from '@mui/material';
import { KeyboardArrowRight, RemoveRedEye } from '@mui/icons-material';

export const CharactersShow = (id: any, props: any) => {
  let [showPanel, setShowPanel] = useState(false);
  const { data } = useGetOne('characters', id);
  const handleClick = () => {
      setShowPanel(true);
  };

  const handleCloseClick = () => {
      setShowPanel(false);
  };

  return (
    <>
      <Button onClick={handleClick} label="See Details">
        <RemoveRedEye />
      </Button>
      <Drawer anchor="right" open={showPanel} onClose={handleCloseClick}>
        <div>
          <Button label="Close" onClick={handleCloseClick}>
            <KeyboardArrowRight />
          </Button>
        </div>
        <SimpleShowLayout record={data}>
          <TextField source="name" label="Name" sx={{ color: "#ffc200", fontSize: "18px", fontWeight: "bold" }} />
          <TextField source="series.available" label="Series" sx={{ color: "#675500", fontSize: "18px", fontWeight: "bold" }} />
          <TextField source="stories.available" label="Stories" sx={{ color: "#b055cf", fontWeight: "bold", fontSize: "18px" }} />
          <ArrayField source="comics.items" label=''>
            <Datagrid bulkActionButtons={false}>
              <TextField source="name" label="Comics" sx={{ color: "blue" }} />
            </Datagrid>
          </ArrayField>
        </SimpleShowLayout>
      </Drawer>
    </>
  );
};