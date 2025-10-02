import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import TeacherProfile from "./TeacherProfile";

const TeachersProfileMobile = () => {
  return (
    <Dialog>
      {/* Блюр для всего заднего фона */}
      <DialogOverlay className="backdrop-blur-xs bg-amber-50/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

      <DialogTrigger className="flex items-center w-full gap-3 px-4 py-3 bg-gradient-to-r from-sch-green-light/10 to-sch-green-light/5 border border-sch-green-light/30 rounded-2xl hover:from-sch-green-light/15 hover:to-sch-green-light/10 transition-all duration-300 group shadow-sm hover:shadow-md">
        <div className="flex -space-x-3">
          <Avatar className="w-10 h-10 border-2 border-white shadow-md group-hover:scale-105 transition-transform">
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback className="bg-sch-green-light text-white">
              LR
            </AvatarFallback>
          </Avatar>
          <Avatar className="w-10 h-10 border-2 border-white shadow-md group-hover:scale-105 transition-transform">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback className="bg-sch-green-light text-white">
              ER
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center gap-2 w-full justify-between">
          <span className="font-codec-bold text-sm text-gray-400">
            Преподаватели проекта
          </span>
          <ChevronRight className="w-4 h-4 text-sch-green-light group-hover:translate-x-1 transition-transform" />
        </div>
      </DialogTrigger>

      <DialogContent className="text-white p-0 overflow-hidden border-0 rounded-2xl shadow-lg max-w-4xl bg-background/95 [&>button]:hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-300">
        <div className="relative">
          {/* Мобильная версия - карусель */}
          <div className="lg:hidden py-6 px-4">
            <Carousel className="w-full max-w-sm mx-auto">
              <CarouselContent>
                <CarouselItem key={1} className="">
                  <div className="px-2">
                    <TeacherProfile />
                  </div>
                </CarouselItem>
                <CarouselItem key={2}>
                  <div className="px-2">
                    <TeacherProfile />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="flex justify-center gap-6 mt-6">
                <CarouselPrevious className="static translate-x-0 translate-y-0 size-12 bg-white/80 backdrop-blur-sm border-2  transition-all" />
                <CarouselNext className="static translate-x-0 translate-y-0 size-12 bg-white/80 backdrop-blur-sm border-2  transition-all" />
              </div>
            </Carousel>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeachersProfileMobile;
