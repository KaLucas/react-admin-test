import { Admin, CustomRoutes, Resource } from "react-admin";
import { UserList } from "./components/users";
import { CharactersList } from "./components/characters";
import PostIcon from "@mui/icons-material/Book";
import { Dashboard } from "./components/Dashboard";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
import { Route } from 'react-router-dom'
import { CustomLayout } from "./layout/custom-layout";

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} layout={CustomLayout}>
    <Resource name="characters" list={CharactersList} icon={PostIcon} />
    <Route path="/users" element={<UserList />} />,
    <CustomRoutes>
    </CustomRoutes>
  </Admin>
);

export default App;