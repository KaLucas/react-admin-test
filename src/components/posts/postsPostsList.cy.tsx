import { Provider } from "react-redux";
import { store } from "../../store/store";
import { PostsList } from "./posts";

describe("<PostsList />", () => {
  it("mounts", () => {
    cy.mount(
      <Provider store={store}>
        <PostsList />
      </Provider>
    );
  });
});
