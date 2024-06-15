import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import HelloPage from "../screens/HelloPage";
import Coverpage from "../screens/CoverPage";
import PersonalisationPage from "../screens/PersonalisationPage";
import HomePage from "../screens/HomePage";
import CreativeHub from "../screens/CreativeHub";
import HolidayPage from "../screens/HolidayPage";
import ErrorPage from "../screens/ErrorPage";
import SystemShutdownPage from "../screens/SystemShutdownPage";
import Summary from "../screens/Summary";

export default function AppRoutes() {
  const routes = [
    {
      path: "/:client_name/",
      element: <HelloPage />,
    },
    {
      path: "/:client_name/cover-page",
      element: <Coverpage />,
    },
    {
      path: "/:client_name/home-page",
      element: <HomePage />,
    },
    {
      path: "/:client_name/personalisation",
      element: <PersonalisationPage />,
    },
    {
      path: "/:client_name/creative-hub",
      element: <CreativeHub />,
    },
    {
      path: "/:client_name/holiday-page",
      element: <HolidayPage />,
    },
    {
      path: "*",
      element: <HelloPage />,
    },
    {
      path: "/:client_name/error-page",
      element: <ErrorPage />,
    },
    {
      path: "/:client_name/system-shutdown",
      element: <SystemShutdownPage />,
    },
    {
      path: "/:client_name/summary",
      element: <Summary />,
    },
    {
      path: "/",
      element: <HelloPage />,
    },
    {
      path: "/cover-page",
      element: <Coverpage />,
    },
    {
      path: "/home-page",
      element: <HomePage />,
    },
    {
      path: "/personalisation",
      element: <PersonalisationPage />,
    },
    {
      path: "/creative-hub",
      element: <CreativeHub />,
    },
    {
      path: "/holiday-page",
      element: <HolidayPage />,
    },
    {
      path: "*",
      element: <HelloPage />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "/system-shutdown",
      element: <SystemShutdownPage />,
    },
    {
      path: "/summary",
      element: <Summary />,
    },
  ];
  return useRoutes(routes);
}
