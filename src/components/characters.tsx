
import { useState } from 'react'
import { List, Datagrid, TextField, FunctionField, ShowButton, useRecordContext, DateField, RichTextField, Show, SimpleShowLayout, TabbedShowLayout, EditButton, ReferenceManyField, Tab, ReferenceField, Button, useGetOne } from "react-admin";
import { KeyboardArrowRight, RemoveRedEye } from '@mui/icons-material';
import { Drawer } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  field: {
    '& span': {
        display: 'inline-block',
        maxWidth: '20em'
    }
  }
});


export const CharactersList = () => {
  const [showPanel, setShowPanel] = useState(false);
  const handleClick = () => {
    setShowPanel(true);
  };
  return (
    <>
      <List>
        <Datagrid>
          {/* <FunctionField source="date" label="Data de Venda" render={(record: any) => {
              return (
                <RecordContextProvider value={{date: record.dates.find((res: any) => res.type === 'onsaleDate').date}}>
                  <DateField source="date" locales="pt-BR" />
                </RecordContextProvider>
              )
            }
          } /> */}

          <TextField source="name" label="Personagem" />
          <FunctionField label="Imagem" render={(record: any) => <img src={`${record.thumbnail.path}.${record.thumbnail.extension}`} title="image" width="100px" />} />
          <Button onClick={handleClick} label="ra.action.show">
              <RemoveRedEye />
          </Button>
          {/* <ShowButton label="Ver Detalhes"/> */}
          {/* <FunctionField render={(record: any)  => {
            return (
              // <ShowButton label="Ver Detalhes" resource='characters' record={record} onClick={() => setIsOpen(true)}/>
            )}
          } */}
          {/* /> */}
        </Datagrid>
      </List>
      <FunctionField render={(record: any) => <PostQuickPreviewButton id={record.id} isOpen={showPanel} /> } />
      {/* <PostQuickPreviewButton id={record.id}  open={showPanel} /> */}
      {/* <FunctionField render={(record: any) => {
        }} /> */}
    </>
  )};

  const PostQuickPreviewButton = ( id: any, isOpen: boolean ) => {
    let [showPanel, setShowPanel] = useState(false);
    const classes = useStyles();
    const { data } = useGetOne('characters', id);
    showPanel = isOpen;
    const handleClick = () => {
        setShowPanel(true);
    };

    const handleCloseClick = () => {
        setShowPanel(false);
    };

    return (
        <>
            <Drawer anchor="right" open={showPanel} onClose={handleCloseClick}>
                <div>
                    <Button label="Close" onClick={handleCloseClick}>
                        <KeyboardArrowRight />
                    </Button>
                </div>
                <SimpleShowLayout record={data}>
                    <TextField source="id" />
                    <TextField source="title" className={classes.field} />
                    <TextField source="teaser" className={classes.field} />
                </SimpleShowLayout>
            </Drawer>
        </>
    );
};