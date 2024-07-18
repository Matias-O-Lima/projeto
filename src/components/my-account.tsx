"use client";
import React, { useEffect } from 'react';

import { isAxiosError } from 'axios';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import api from '@/lib/api';
import { mphone } from '@/lib/phone';
import { firstLastLetter } from '@/lib/utils';
import {
  useStore,
  useToken,
} from '@/store/useStore';

import { useToast } from '../hooks/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loading } from './ui/loading';

interface FormData {
  name: string;
  phone: string;
}

const onUpdateError = (error: any, toast: any) => {
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

async function updateUser(credentials: FormData & { accessToken: string }) {
  const { name, phone } = credentials;
  const response = await api.put(
    `/user/me`,
    {
      name,
      phone,
    },
    {
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`,
      },
    }
  );
  return response.data;
}

export function MyAccountForm() {
  const { user, setUser } = useStore();
  const { token } = useToken();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user.name,
      phone: mphone(user.phone),
    },
  });

  const updateMutation = useMutation(updateUser);
  const onSubmit = async (data: FormData) => {
    try {
      await updateMutation.mutateAsync({
        ...data,
        accessToken: token as string,
      });
      setUser({
        ...user,
        name: data.name,
        phone: data.phone.replace(/[^0-9+]/g, ""),
      });
      toast({
        title: "Uh oh! Maverick.",
        description: "Dados Atualizados.",
      });
    } catch (error) {
      onUpdateError(error, toast);
    }
  };

  useEffect(() => {
    setValue("name", user.name);
    setValue("phone", mphone(user.phone));
  }, [user]);
  return (
    <>
      <div className="flex flex-row p-10 gap-20 w-full">
        <div className="flex flex-col">
          <div className="relative inline-flex items-center justify-center w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300 text-3xl">
              {firstLastLetter(user?.name ?? "")}
            </span>
          </div>
        </div>
        <div className="flex flex-col p-0 w-full">
          <form
            className="flex flex-col gap-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-row p-0 w-full gap-10">
              <div className="flex flex-col gap-2 w-full">
                <label>Nome</label>
                <Input
                  className="w-full p-2"
                  placeholder="Seu nome"
                  {...register("name", { required: "Nome é obrigatório" })}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label>E-mail</label>
                <Input
                  className="w-full p-2"
                  disabled
                  value={user?.email}
                  placeholder="Seu e-mail"
                />
              </div>
            </div>
            <div className="flex flex-row p-0 w-full gap-10">
              <div className="flex flex-col gap-2 w-full">
                <label>Telefone</label>
                <Input
                  {...register("phone", {
                    required: "Telefone é obrigatório",
                    validate: () =>
                      isValidPhoneNumber(
                        "+" + watch("phone").replace(/\D/g, "")
                      ),
                  })}
                  className="w-1/2 p-2"
                  value={watch("phone")}
                  onChange={(e) => setValue("phone", mphone(e.target.value))}
                  placeholder="Seu telefone"
                />
                {errors.phone && (
                  <span className="text-red-500">
                    {!!errors?.phone?.message &&
                    errors?.phone?.message?.length > 0
                      ? errors?.phone?.message
                      : "Telefone inválido"}
                  </span>
                )}
              </div>
              <div></div>
            </div>
            <div className="flex flex-row p-0 w-full gap-10">
              <Button
                type="submit"
                className="flex pl-10 pr-10"
                disabled={false}
              >
                {false ? <Loading /> : "Salvar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
