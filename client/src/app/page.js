import React from "react";
import Banner from "./(components)/home/Banner";
import CheckProduct from "./(components)/home/CheckProduct";
import Category from "./(components)/home/Category";

import FreshCollection from "./(components)/home/FreshCollection";
import LatestProducts from "./(components)/home/LatestProducts";
import Testimonial from "./(components)/home/Testimonial";
import CapsuleCollection from "./(components)/home/CapsuleCollection";
import Model from "./(components)/home/Model";
import BrandName from "./(components)/home/BrandName";

const page = () => {
  return (
    <>
      <Banner />
      <CheckProduct />
      <BrandName />
      <FreshCollection />
      <LatestProducts />
      <CapsuleCollection />

      <Testimonial />

      {/* <Category /> */}
    </>
  );
};

export default page;
