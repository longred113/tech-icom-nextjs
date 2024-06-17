import Head from "next/head";
import Image from "next/image";
import Layout from "./components/Layout";

export default function Home() {
  return (
    <Layout>
      <section className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <Head>
          <title>Trang Công Nghệ</title>
          <meta name="description" content="Trang web công nghệ của bạn" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className="text-6xl font-bold">
          Chào mừng bạn đến với{' '}
          <a className="text-blue-600" href="#">
            Trang Công Nghệ!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Hãy khám phá những tin tức và bài viết mới nhất về công nghệ.
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            href="#"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 bg-white"
          >
            <h2 className="text-2xl font-bold">Bài Viết 1 &rarr;</h2>
            <p className="mt-4 text-xl">
              Tìm hiểu về những xu hướng công nghệ mới nhất.
            </p>
          </a>

          <a
            href="#"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 bg-white"
          >
            <h2 className="text-2xl font-bold">Bài Viết 2 &rarr;</h2>
            <p className="mt-4 text-xl">
              Đánh giá các sản phẩm công nghệ mới.
            </p>
          </a>

          <a
            href="#"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 bg-white"
          >
            <h2 className="text-2xl font-bold">Bài Viết 3 &rarr;</h2>
            <p className="mt-4 text-xl">
              Mẹo và thủ thuật sử dụng các thiết bị công nghệ.
            </p>
          </a>

          <a
            href="#"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 bg-white"
          >
            <h2 className="text-2xl font-bold">Bài Viết 4 &rarr;</h2>
            <p className="mt-4 text-xl">
              Phân tích chuyên sâu về các công nghệ tiên tiến.
            </p>
          </a>
        </div>
      </section>
    </Layout>
  );
}
