
import { List, Datagrid, TextField, FunctionField } from "react-admin";
import { makeStyles, createStyles } from '@mui/styles';
import { CharactersShow } from './characters-show';

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

          <TextField source="name" label="Character" className={classes.green} />
          <FunctionField label="Image" render={(record: any) => <img src={`${record.thumbnail.path}.${record.thumbnail.extension}`} title="image" width="100px" />} />
          <FunctionField render={(record: any) => <CharactersShow id={record.id} />} />
        </Datagrid>
      </List>

  )
};