import React from 'react';
import { Redirect } from "react-router-dom";

import HomeLayout from '../layouts/HomeLayout';
import Recommend from '../pages/Recommend';
import Rank from '../pages/Rank';
import Singers from '../pages/Singers';
import Singer from '../pages/Singer';
import Album from '../pages/Album'
import Search from '../pages/Search'

export default [
  {
    component: HomeLayout,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to={"/recommend"} />,
      },
      {
        path: "/recommend",
        key: "recommend",
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            key: "recommendAlbum",
            component: Album
          }
        ]
      },
      {
        path: "/singers",
        key: "singers",
        component: Singers,
        routes: [
          {
            path: "/singers/:id",
            key: "singer",
            component: Singer
          }
        ]
      },
      {
        path: "/rank",
        key: "rank",
        component: Rank,
        routes: [
          {
            path: "/rank/:id",
            key: "rankDetail",
            component: Album
          }
        ]
      },
      {
        path: "/album/:id",
        exact: true,
        key: "album",
        component: Album
      },
      {
        path: "/search",
        exact: true,
        key: "search",
        component: Search
      }
    ]
  }
]