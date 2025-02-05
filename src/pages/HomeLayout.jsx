import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import {NavBar, Loading} from "../components";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return <>
    <NavBar />
    {isPageLoading ? <Loading /> : (
        <section className="container-layout py-10">
          <Outlet />
        </section>
    )}
  </>;
};

export default HomeLayout;