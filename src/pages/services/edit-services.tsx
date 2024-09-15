import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { Form } from "../../components";
import { FieldValues } from "react-hook-form";

type IIdentity = {
  id: number;
  name: string;
  email: string
};

const EditService = () => {
  const { data: user } = useGetIdentity<IIdentity>();
  const [serviceImage, setServiceImage] = useState({ name: "", url: "" });

  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setServiceImage({ name: file?.name, url: result }),
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!serviceImage.name) {
      await onFinish({
        ...data,
        email: user?.email,
      });
    }
    else {
      await onFinish({
        ...data,
        photo: serviceImage.url,
        email: user?.email,
      });
      
    }


  };

  return (
    <Form
      type="Edit"
      register={register}
      onFinish={onFinish}
      formLoading={isSubmitting}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      serviceImage={serviceImage}
    />
  );
};

export default EditService;
