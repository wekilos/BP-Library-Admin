import { lazy } from "react";
export const Login = lazy(() => import("./login/login"));
export const Home = lazy(() => import("./home/Home"));

///

export const Category = lazy(() => import("./category/category"));
export const CategoryCreate = lazy(() => import("./category/categoryCreate"));
export const CategoryUpdate = lazy(() => import("./category/categoryUpdate"));

export const CategoryItem = lazy(() => import("./categoryItem/categoryItem"));
export const CategoryItemCreate = lazy(() =>
  import("./categoryItem/categoryItemCreate")
);
export const CategoryItemUpdate = lazy(() =>
  import("./categoryItem/categoryItemUpdate")
);
