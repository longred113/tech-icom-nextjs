'use client'
import Head from "next/head";
import Image from "next/image";
import Layout from "./components/Layout";
import LaptopList from "./components/laptopList";
import Sidebar from "./components/sidebar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MouseList from "./components/mouseList";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const imageRef = useRef<any>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [hoveredDetail, setHoveredDetail] = useState(false);
  const [leaveTimeout, setLeaveTimeout] = useState(null);

  useEffect(() => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.offsetWidth,
        height: imageRef.current.offsetHeight
      });
    }
  }, []);

  const handleHover = (item: any) => {
    setHoveredItem(item);
    setShowDetail(true);
  }

  const handleLeave = () => {
    // if (!hoveredDetail) {
    //   if (leaveTimeout) {
    //     clearTimeout(leaveTimeout); // Clear existing timeout if any
    //   }
    //   // Set new timeout to hide detail after 300ms
    //   setLeaveTimeout(setTimeout(() => {
    //     setShowDetail(false);
    //     setHoveredItem(null);
    //   }, 100) as any);
    // }
    if (!hoveredDetail) {
      setShowDetail(false);
      setHoveredItem(null);
    }
  };

  return (
    <Layout>
      <section className="flex flex-col items-center m-3">
        <div className="flex md:w-8/12 w-full relative gap-4">
          <div className="h-fit my-4 hidden xl:block pr-3">
            <Sidebar onHover={handleHover} onLeave={handleLeave} />
          </div>
          <div className="w-full mx-auto flex justify-center py-4 relative">
            <div className="w-full">
              <Image
                alt="image"
                src="https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_laptop_lenovo-edit_95ee3ac03fa44ccf8e1adf2fa264f2a7.jpg"
                layout="responsive"
                width={800}
                height={400}
                quality={75}
                className="w-full h-auto"
                ref={imageRef}
              />
            </div>
          </div>
        </div>
        <div className="md:w-8/12 w-full rounded-lg bg-white mb-5">
          <LaptopList />
        </div>
        <div className="md:w-8/12 w-full rounded-lg bg-white mb-5">
          <MouseList />
        </div>
      </section>
    </Layout>
  );
}
