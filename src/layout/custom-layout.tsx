import { Layout } from 'react-admin'
import { CustomMenu } from './custom-menu'

export const CustomLayout = (props: any) => <Layout {...props} menu={CustomMenu} />