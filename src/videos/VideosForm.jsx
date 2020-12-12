import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createVideo } from "../store/videos";

const VideosForm = (props) => {
  let { register, handleSubmit } = useForm();
  let dispatch = useDispatch();

  let onSubmit = async (video) => {
    let formData = new FormData();

    formData.append("title", video.title);
    formData.append("video", video.video[0]);
    
    dispatch(createVideo(formData));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="title"
        ref={register}
        id=""
        placeholder="Titulo"
      />
      <input type="file" name="video" ref={register} id="" />
      <input type="submit" value="Enviar" />
    </form>
  );
};

export default VideosForm;
