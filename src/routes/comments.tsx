import { createRoute } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import CommentsComponent from "../pages/commentsPage";

export const commentsRoute = createRoute({
  path: "/comments",
  getParentRoute: () => RootRoute,
  component: CommentsComponent,
});
