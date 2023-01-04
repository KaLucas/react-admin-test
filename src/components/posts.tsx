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
} from "react-admin";

// const PostTitle = () => {
//   const record = useRecordContext();
//   return <span>Post {record ? `"${record.title}"` : ''}</span>;
// };

// const postFilters = [
//   <TextInput source="q" label="Search" alwaysOn />,
//   <ReferenceInput source="userId" label="User" reference="users" />,
// ];


export const PostList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
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