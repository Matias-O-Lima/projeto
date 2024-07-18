"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import { isAxiosError } from "axios";

//@ts-ignore
import cookieCutter from "cookie-cutter";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { crypt } from "@/lib/crypt";
import { useStore } from "@/store/useStore";

import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loading } from "../ui/loading";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
  isHexFirstAccess?: boolean;
}

interface ValidateFormData {
  email: string;
}

interface ProvidedQueryParams {
  email?: string;
  hexFirstAccess?: string;
}

const onLoginError = (error: any, toast: any) => {
  if (isAxiosError(error)) {
    if (error.response && error.response.data && error.response.data.message) {
      toast({
        title: "Uh oh! Maverick.",
        description: error.response.data.message + ".",
      });
    } else {
      toast({
        title: "Uh oh! Maverick.",
        description: "Erro desconhecido.",
      });
    }
  }
};

async function loginUser(credentials: LoginFormData) {
  const { email, password, isHexFirstAccess } = credentials;
  const response = await api.post(`/auth/login`, {
    email,
    password,
    isHexFirstAccess,
  });
  return response.data;
}

async function validateUserEmail(credentials: ValidateFormData) {
  const { email } = credentials;
  const response = await api.post(`/auth/register-validate`, { email });
  return response.data;
}

export function LoginForm(params?: ProvidedQueryParams) {
  const { toast } = useToast();
  const { replace } = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const { setUser } = useStore();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (
      !!params?.hexFirstAccess &&
      params?.hexFirstAccess.length > 0 &&
      !!params?.email &&
      params?.email.length > 0
    ) {
      onSubmit({
        email: params.email,
        password: params?.hexFirstAccess,
        isHexFirstAccess: true,
      });
    }
  }, [params?.hexFirstAccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: params?.email ?? "",
    },
  });

  const loginMutation = useMutation(loginUser);
  const validateMutation = useMutation(validateUserEmail);

  const onSubmit = async (data: LoginFormData) => {
    try {
      if (isRegister) {
        const urlCheckout = await validateMutation.mutateAsync(data);
        window.location.replace(urlCheckout);
      } else {
        const userData = await loginMutation.mutateAsync(data);

        const tokenEncrypted = crypt(userData.token);

        cookieCutter.set("@token-client", tokenEncrypted, {
          path: "/",
          expires: new Date(new Date().getTime() + 60 * 60 * 23 * 1000),
        });

        setUser(userData.user);
        replace("/dashboard");
      }
    } catch (error) {
      onLoginError(error, toast);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-center md:justify-start">
        <img src="/assets/logo.svg" alt="" className="max-w-[280px]" />
      </div>
      <form
        className="flex flex-col gap-6 mt-24"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label>Seu e-mail</label>
          <Input
            placeholder="Digite seu e-mail"
            {...register("email", { required: "E-mail é obrigatório" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        {!isRegister && (
          <div className="flex flex-col gap-2 relative">
            <label>Sua senha</label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              {...register("password", { required: "Senha é obrigatória" })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
            <div className="absolute pt-8 inset-y-0 right-0 flex items-center pr-3">
              {showPassword ? (
                <Eye
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                  size={20}
                />
              ) : (
                <EyeOff
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                  size={20}
                />
              )}
            </div>
          </div>
        )}
        {!isRegister && (
          <Button
            type="submit"
            size="lg"
            className="flex w-full"
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? <Loading /> : "Acessar sua conta"}
          </Button>
        )}
        {isRegister && (
          <Button
            type="submit"
            size="lg"
            className="flex w-full"
            disabled={validateMutation.isLoading}
          >
            {validateMutation.isLoading ? <Loading /> : "Criar conta"}
          </Button>
        )}
      </form>
      <div className="w-full h-[2px] bg-gray-700 mb-6 mt-16 max-md:mt-12"></div>

      <div
        onClick={() => setIsRegister((prev) => !prev)}
        className="w-full flex gap-4 px-6 py-4 bg-[#16161e] border border-gray-900 hover:brightness-125 transition rounded-md cursor-pointer"
      >
        <div className="flex text-sm flex-row gap-1 text-gray-200">
          {isRegister ? "já tem uma conta?" : "Não tem uma conta?"}
          <b>clique aqui.</b>
        </div>
      </div>
    </div>
  );
}
