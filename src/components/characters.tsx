import { 
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
  Create,
  useRecordContext,
  Pagination,
  FunctionField,
  RecordContextProvider,
  DateField,
  ImageField,
} from "react-admin";

// const PostTitle = () => {
//   const record = useRecordContext();
//   return <span>Post {record ? `"${record.title}"` : ''}</span>;
// };

const postFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="userId" label="User" reference="users" />,
];



export const CharactersList = () => (
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
    </Datagrid>
  </List>
);
// export const PostEdit = () => (
//   <Edit title={<PostTitle />}>
//     <SimpleForm>
//       <TextInput source="id" disabled />
//       <ReferenceInput source="userId" reference="users" />
//       <TextInput source="title" />
//       <TextInput source="body" multiline rows={5} />
//     </SimpleForm>
//   </Edit>
// );

// export const PostCreate = () => (
//   <Create>
//     <SimpleForm>
//       <ReferenceInput source="userId" reference="users" />
//       <TextInput source="title" />
//       <TextInput source="body" multiline rows={5} />
//     </SimpleForm>
//   </Create>
// );