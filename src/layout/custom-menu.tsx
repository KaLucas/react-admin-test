import { DashboardMenuItem, Menu, MenuItemLink } from 'react-admin'
import { PeopleAlt, Gavel } from '@mui/icons-material';

export const CustomMenu = (props: any) => (
  <Menu {...props}>
    <DashboardMenuItem />
    <MenuItemLink to="/characters" primaryText="Personagens da Marvel" leftIcon={<Gavel />}/>
    <MenuItemLink to="/users" primaryText="Usuários" leftIcon={<PeopleAlt />}/>
  </Menu>
)