import React, { lazy } from 'react';
import { Redirect } from "react-router-dom";

const HomeLayout = lazy(() => import(/* webpackChunkName: "HomeLayout" */'../layouts/HomeLayout'));
const Recommend = lazy(() => import(/* webpackChunkName: "Recommend" */'../pages/Recommend'));
const Rank = lazy(() => import(/* webpackChunkName: "Rank" */'../pages/Rank'));
const Singers = lazy(() => import(/* webpackChunkName: "Singers" */'../pages/Singers'));
const Singer = lazy(() => import(/* webpackChunkName: "Singer" */'../pages/Singer'));
const Album = lazy(() => import(/* webpackChunkName: "Album" */'../pages/Album'));
const Search = lazy(() => import(/* webpackChunkName: "Search" */'../pages/Search'));

export default [
  {
    component: HomeLayout,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => {
          return <Redirect to={"/recommend"} />
        }
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