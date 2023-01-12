
import { useState } from 'react'
import { List, Datagrid, TextField, FunctionField, ShowButton } from "react-admin";
import CharacterDetailsDialog from '../dialogs/character-details-dialog';

export const CharactersList = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <ShowButton label="Ver Detalhes" onClick={() => setIsOpen(true)}/>
          <CharacterDetailsDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </Datagrid>
      </List>
    </>
  )};