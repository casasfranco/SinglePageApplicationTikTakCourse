import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { singIn } from "../store/user";

const SingIn = (props) => {
  let dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  let onSubmit = (data) => {
    dispatch(
      singIn({
        credentials: data,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        name="email"
        ref={register}
        placeholder="Correo electrónico"
      />
      <input
        type="password"
        name="password"
        ref={register}
        placeholder="Contraseña"
      />
      <input type="submit" value="enviar" />
    </form>
  );
};

export default SingIn;
