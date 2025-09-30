// components/layouts/MainLayoutAuth.tsx
import { ReactNode } from "react";
import { Separator } from "../ui/separator";

interface MainLayoutAuthProps {
  children: ReactNode;
  className?: string;
}

export const MainLayoutAuth = ({
  children,
  className = "",
}: MainLayoutAuthProps) => {
  return (
    <div
      className={`min-h-screen  flex flex-col items-center  p-4 ${className}`}
    >
      <h1 className="font-codec w-full text-white uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl lg:mt-10">
        Единое школьное
        <br /> информационное пространство
      </h1>
      <Separator className="my-1 bg-sch-green-light lg:hidden " />
      <div className="w-full max-w-md mt-5 lg:mt-40">{children}</div>
    </div>
  );
};
