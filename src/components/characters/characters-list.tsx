import { List, Datagrid, TextField, FunctionField } from "react-admin";
import { CharactersShow } from "./characters-show";

export const CharactersList = (props: any) => {
  return (
    <List {...props}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" label="Character" sx={{ color: "#008000" }} />
        <FunctionField
          label="Image"
          render={(record: any) => (
            <img
              src={`${record.thumbnail.path}.${record.thumbnail.extension}`}
              title="image"
              width="100px"
            />
          )}
        />
        <FunctionField
          render={(record: any) => <CharactersShow id={record.id} />}
        />
      </Datagrid>
    </List>
  );
};
