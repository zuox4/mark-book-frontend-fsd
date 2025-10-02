import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Header = () => {
  return (
    <header className="text-md lg:text-2xl py-2 px-2 h-20 lg:px-20 w-full z-100 rounded-b-2xl bg-[#1B4E71] font-codec justify-between text-white flex flex-row items-end fixed top-0 left-0">
      <h1 className="uppercase border-b-2 border-sch-green-light">
        Единое школьное пространство
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-end gap-3">
          <span className="hidden lg:flex text-lg font-codec-news">
            Найдюк Кирилл Константинович
          </span>
          <Avatar className="rounded-full">
            <AvatarImage
              src="https://sch1298sz.mskobr.ru/attach_files/photo_new/photo_7ce6ea016a26fe34eb6a0adb1d2138a9_683fe243729e1.jpeg"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="lg:bg-white backdrop-blur-lg flex flex-col items-center rounded-none h-screen w-screen  top-0 px-3 lg:w-100 lg:h-fit border-0 lg:rounded-2xl">
          {/* <DropdownMenuLabel>Информация об аккаунте</DropdownMenuLabel> */}
          <DropdownMenuSeparator className="bg-sch-green-light" />
          <div className="w-full flex flex-col items-center">
            <Avatar className="w-30 h-30 items-center">
              <AvatarImage
                className=""
                src="https://sch1298sz.mskobr.ru/attach_files/photo_new/photo_7ce6ea016a26fe34eb6a0adb1d2138a9_683fe243729e1.jpeg"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <span className="font-codec text-xl mt-2">
              Найдюк Кирилл Константинович
            </span>
            <span className="font-codec-news text-lg">
              {"k.k.nayduk@school1298.ru"}
            </span>
            <span className="text-gray-600 font-codec-news">Учитель</span>
          </div>
          <Button variant={"link"} onClick={() => alert("123")} className="">
            Выйти
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
