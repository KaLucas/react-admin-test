
import { useState } from 'react'
import { List, Datagrid, TextField, FunctionField, SimpleShowLayout, Button, useGetOne, ArrayField } from "react-admin";
import { KeyboardArrowRight, RemoveRedEye } from '@mui/icons-material';
import { Drawer } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    green: {
      color: "#008000"
    }
  }),
)

export const CharactersList = (props: any) => {
  const classes = useStyles();
  return (
      <List {...props}>
        <Datagrid bulkActionButtons={false}>
          {/* <FunctionField source="date" label="Data de Venda" render={(record: any) => {
              return (
                <RecordContextProvider value={{date: record.dates.find((res: any) => res.type === 'onsaleDate').date}}>
                  <DateField source="date" locales="pt-BR" />
                </RecordContextProvider>
              )
            }
          } /> */}

          <TextField source="name" label="Personagem" className={classes.green} />
          <FunctionField label="Imagem" render={(record: any) => <img src={`${record.thumbnail.path}.${record.thumbnail.extension}`} title="image" width="100px" />} />
          <FunctionField render={(record: any) => <CharactersDetails id={record.id} />} />
        </Datagrid>
      </List>

  )
};

const CharactersDetails = (id: any, props: any) => {
  let [showPanel, setShowPanel] = useState(false);
  const { data } = useGetOne('characters', id);
  const classes = useStyles();
  const handleClick = () => {
      setShowPanel(true);
  };

  const handleCloseClick = () => {
      setShowPanel(false);
  };

  return (
    <>
      <Button onClick={handleClick} label="Ver Detalhes">
        <RemoveRedEye />
      </Button>
      <Drawer anchor="right" open={showPanel} onClose={handleCloseClick}>
        <div>
          <Button label="Fechar" onClick={handleCloseClick}>
            <KeyboardArrowRight />
          </Button>
        </div>
        <SimpleShowLayout record={data}>
          <TextField source="name" label="Nome" sx={{ color: "#ffc200", fontSize: "18px", fontWeight: "bold" }} />
          <TextField source="series.available" label="Séries" sx={{ color: "#675500", fontSize: "18px", fontWeight: "bold" }} />
          <TextField source="stories.available" label="Histórias" sx={{ color: "#b055cf", fontWeight: "bold", fontSize: "18px" }} />
          <ArrayField source="comics.items" label=''>
            <Datagrid bulkActionButtons={false}>
              <TextField source="name" label="HQs" sx={{ color: "blue" }} />
            </Datagrid>
          </ArrayField>
        </SimpleShowLayout>
      </Drawer>
    </>
  );
};