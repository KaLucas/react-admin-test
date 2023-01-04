import { Admin, Resource } from "react-admin";
import { UserList } from "./components/users";
import { PostList } from "./components/posts";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from "./components/Dashboard";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
// import jsonServerProvider from "ra-data-json-server";

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource name="posts" list={PostList} icon={PostIcon} />
    <Resource name="users" list={UserList} icon={UserIcon} recordRepresentation="name" />
  </Admin>
);

export default App;