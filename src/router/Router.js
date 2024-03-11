import { React, lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageLoading from "../components/PageLoading";

import {
  Category,
  CategoryCreate,
  CategoryItem,
  CategoryItemCreate,
  CategoryItemUpdate,
  CategoryUpdate,
  Home,
  Login,
} from "../pages/index";

import ScrollIntoView from "./ScrollIntoView";

const PrivateRoute = lazy(() => import("./PrivateRoute"));
// const PublicRoute = lazy(() => import("./PublicRoute"));
const App = () => {
  return (
    <BrowserRouter>
      <ScrollIntoView>
        <Suspense fallback={<PageLoading />}>
          <Switch>
            <PrivateRoute restricted={true} component={Home} path="/" exact />

            <PrivateRoute
              restricted={true}
              component={Category}
              path="/categories"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={CategoryCreate}
              path="/categories/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={CategoryUpdate}
              path="/categories/:id"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={CategoryItem}
              path="/category/:id"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={CategoryItemCreate}
              path="/category/:id/create"
              exact
            />
            <PrivateRoute
              restricted={true}
              component={CategoryItemUpdate}
              path="/category/:id/update/:itemId"
              exact
            />

            <PrivateRoute
              restricted={true}
              component={Home}
              path="/admins"
              exact
            />

            {/* Global */}
            {/* <PrivateRoute component={Home} path="*" /> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Suspense>
      </ScrollIntoView>
    </BrowserRouter>
  );
};

export default App;
