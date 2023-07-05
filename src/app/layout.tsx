import Navbar from "@/components/navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "App",
  description: "tailwind ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center space-y-10 ">
          <div className="z-20 w-full fixed flex justify-around items-center font-mono text-sm border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-5  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit ">
            <p className="  ">Bonjour à tous !</p>
            <Navbar />
          </div>
          {/* background Blur  */}
          <div className="flex flex-row justify-center flex-nowrap h-10 md:h-auto w-full px-10 md:px-30">
            <div
              className="fixed place-items-center before:absolute before:h-[300px] before:w-[280px] before:blur before:translate-x-2 before:rounded-full 
      h-0 before:bg-gradient-radial before:from-white before:to-transparent  before:content-[''] after:absolute break-before-avoid:-z-20 after:h-[180px] after:w-[240px] after:translate-x-3 after:bg-gradient-conic after:from-sky-200 after:via-blue-100 after:blur-xl after:content-[''] before:-z-20 after:-z-20 before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-200 before:dark:opacity-10 after:dark:from-sky-300 after:dark:via-[#83858a] after:dark:opacity-40 before:lg:h-[360px] -z-20"
            ></div>
            {/* Menu  */}
            <div className="w-40 fixed top-36  place-items-center  hidden sm:block ">
              {/* Left Menu   */}
            </div>
            <div className="w-11/12 mt-16 border-white mx-7 sm:mx-10 ">
              {/* blur element  */}
              <div className="fixed right-40 before:absolute before:h-[300px] before:w-[180px] before:blur before:translate-x-7 before:rounded-full h-0 before:bg-gradient-radial before:from-white before:to-transparent  before:content-[''] after:absolute break-before-avoid:-z-20 after:h-[180px] after:w-[240px] after:translate-x-3 after:bg-gradient-conic after:from-sky-200 after:via-blue-100 after:blur-xl after:content-[''] before:-z-20 after:-z-20 before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-200 before:dark:opacity-10 after:dark:from-sky-300 after:dark:via-[#83858a] after:dark:opacity-40 before:lg:h-[360px] -z-20"></div>
              {/* Content */}
              {children}
              {/* <Film films={results} /> */}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
