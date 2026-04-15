import Banner from "@/components/home/Banner";
import BrandName from "@/components/home/BrandName";
import CapsuleCollection from "@/components/home/CapsuleCollection";
import CheckProduct from "@/components/home/CheckProduct";
import FreshCollection from "@/components/home/FreshCollection";
import LatestProducts from "@/components/home/LatestProducts";
import Testimonial from "@/components/home/Testimonial";
import React from "react";

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
    </>
  );
};

export default page;
