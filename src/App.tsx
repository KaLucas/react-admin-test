import { Admin, Resource } from "react-admin";
import { UserList } from "./components/users";
import { CharactersList } from "./components/characters";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from "./components/Dashboard";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource name="characters" options={{ label:"Personagens da Marvel" }} list={CharactersList} icon={PostIcon} />
    <Resource name="users" list={UserList} icon={UserIcon} recordRepresentation="name" />
  </Admin>
);

export default App;