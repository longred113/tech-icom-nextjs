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

export default function Home() {
  return (
    <Layout>
      <section className="flex flex-col items-center m-3">
        <div className="flex md:w-8/12 w-full">
          <div className="h-fit my-4 hidden xl:block">
            <Sidebar />
          </div>
          <div className="border w-full mx-auto flex justify-center py-4">
            <div className="">
              <Image
                alt="image"
                src="https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_laptop_lenovo-edit_95ee3ac03fa44ccf8e1adf2fa264f2a7.jpg"
                width={500}
                height={500}
                quality={75}
              >
              </Image>
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
