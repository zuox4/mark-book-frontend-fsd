import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

const RegisterForm = () => {
  const initialState = { email: "", password: "", confirmPassword: "" };
  const [registerData, setRegisterData] = useState(initialState);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { isLoading, register } = useAuth();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
    setRegisterData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: "", password: "", confirmPassword: "" };
    if (!registerData.email || !validateEmail(registerData.email))
      newErrors.email = "Email обязателен";
    if (!registerData.password) newErrors.password = "Пароль обязателен";
    if (!registerData.confirmPassword)
      newErrors.password = "Подтвердите пароль";
    if (registerData.confirmPassword !== registerData.password)
      newErrors.password = "Пароли не совпадают";
    if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
      setErrors(newErrors);
      return;
    }
    console.log("Данные для входа:", registerData);

    register(registerData.email, registerData.password);
  };

  return (
    <>
      <Card className="w-full max-w-md shadow-none lg:bg-sch-blue-ultra/30 text-white border-0 font-news">
        <CardHeader>
          <CardTitle className="text-center uppercase text-xl">
            Регистрация в системе
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <form>
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className={`${errors.email && "border-red-600"} h-12`}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Пароль</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="Пароль"
                  onChange={handleChange}
                  className={`${errors.password && "border-red-600"} h-12`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Повторите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  placeholder="Повторите пароль"
                  onChange={handleChange}
                  className={`${errors.confirmPassword && "border-red-600"} h-12`}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            disabled={!!errors.email || !!errors.password || isLoading}
            onClick={handleRegister}
            type="submit"
            className="w-full bg-sch-green-light cursor-pointer h-10 text-md"
          >
            {isLoading ? "Отправка" : "Зарегистрироваться"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default RegisterForm;
