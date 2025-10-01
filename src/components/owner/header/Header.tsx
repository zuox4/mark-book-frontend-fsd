import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Header = () => {
  return (
    <header className="text-md lg:text-2xl py-2 p-2 w-full bg-sch-blue-ultra/70 font-codec justify-between text-white flex flex-row items-center fixed top-0 left-0">
      <h1 className="uppercase">Единое школьное пространство</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3">
          <span className="hidden lg:flex text-lg">
            Найдюк Кирилл Константинович
          </span>
          <Avatar className="rounded-lg">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white flex flex-col items-center rounded-none h-screen w-screen  top-0 px-3 lg:w-100 lg:h-fit border-0 lg:rounded-2xl">
          <DropdownMenuLabel>Информация об аккаунте</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-sch-green-light" />
          <div className="w-full flex flex-col items-center">
            <Avatar className="w-30 h-30 items-center">
              <AvatarImage
                className=""
                src="https://github.com/evilrabbit.png"
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
            <div className="bg-sch-blue-dark/80 text-white font-codec font-medium border-0 w-full mt-4 rounded-2xl">
              <CardContent className="flex flex-col "></CardContent>
            </div>
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
