import { List, Datagrid, TextField, EmailField, SimpleList } from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useGetUsersQuery } from "../providers/usersApi";
import { useEffect } from "react";

export const UserList = () => {
  const dispatch = useDispatch();
  const {data: users = [], isLoading } = useGetUsersQuery(undefined, {refetchOnMountOrArgChange: true});
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));
  console.log('users');

  // useEffect(() => {
  //   if (!isLoading) {
  //     dispatch(setNotifications(users));
  //   }
  // }, [dispatch, users, isLoading]);
  
  return (
    <List>
    {users.map((user: any) => (
      <Datagrid>
        <TextField source="user.name" />
      </Datagrid>
    ))}
  </List>
  );
};