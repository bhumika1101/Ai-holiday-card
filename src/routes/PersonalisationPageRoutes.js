import React from 'react';
import { Navigate, useRoutes } from "react-router-dom";

import PersonalisationHomePage from '../screens/PersonalisationPage/PersonalisationHomePage';
import PersonalisationLocationPage from '../screens/PersonalisationPage/PersonalisationLocationPage';
import PersonalisationHolidayPage from '../screens/PersonalisationPage/PersonalisationHolidayPage/PersonalisationHolidayPage';
import PersonalisationGenrePage from '../screens/PersonalisationPage/PersonalisationGenrePage';
import PersonalisationImagePage from '../screens/PersonalisationPage/PersonalisationImagePage';

export default function PersonalisationPageRoutes() {

    const routes = [
      {
        path: "",
        element: <PersonalisationHomePage />,
      },
      {
        path: "location",
        element: <PersonalisationLocationPage />,
      },
      {
        path: "holiday",
        element: <PersonalisationHolidayPage />,
      },
      {
        path: "genre",
        element: <PersonalisationGenrePage />,
      },
      {
        path: "image",
        element: <PersonalisationImagePage />,
      },
    ];
  return useRoutes(routes)
}
