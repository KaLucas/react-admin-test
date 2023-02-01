import { Admin, CustomRoutes, Resource } from "react-admin";
import { PostsList } from "./components/posts/posts";
import { CharactersList } from "./components/characters/characters-list";
import PostIcon from "@mui/icons-material/Book";
import { Dashboard } from "./components/dashboard/Dashboard";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
import { Route } from 'react-router-dom'
import { CustomLayout } from "./layout/custom-layout";

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} layout={CustomLayout}>
    <Resource name="characters" list={CharactersList} icon={PostIcon} />
    <CustomRoutes>
      <Route path="/posts" element={<PostsList />} />
    </CustomRoutes>
  </Admin>
);

export default App;