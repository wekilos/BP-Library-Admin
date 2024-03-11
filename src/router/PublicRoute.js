import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import PageLoading from "../components/PageLoading";

const Headers = React.lazy(() => import("../components/Header"));
const Footer = React.lazy(() => import("../components/Footer"));

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <div>
          <Suspense fallback={<PageLoading />}>
            <Headers />
          </Suspense>
          <div
            className="  p-0"
            style={{
              width: "90%",
              minHeight: "80vh",
              margin: "0 auto",
              padding: "0px",
            }}
          >
            <Component {...props} />
          </div>
          <Suspense fallback={<PageLoading />}>
            <Footer />
          </Suspense>
        </div>
      )}
    />
  );
};

export default PublicRoute;
