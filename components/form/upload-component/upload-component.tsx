import StyledInput from "@/components/input/styled-input";
import Loader from "@/components/loader/loader";
import { handleUpload } from "@/libs/helpers";
import { useFormikContext } from "formik";
import Image from "next/image";
import React, { ChangeEvent, useRef} from "react";
import { FaPlus } from "react-icons/fa";

interface IUploadComponent {
  name: string;
}

const Uploadcomponent: React.FC<IUploadComponent> = ({ name }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setFieldValue, getFieldProps, isSubmitting, setSubmitting } =
    useFormikContext();
  const fieldProps = getFieldProps(name!);

  const { value } = fieldProps;

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setSubmitting(true);
    try {
      const url = await handleUpload(event);
      setFieldValue(name, url);
    } catch (error) {
        console.log(error)
    } finally {
        setSubmitting(false)
    }
  };

  return (
    <div
      className="relative overflow-hidden"
      onClick={() => inputRef.current?.click()}
    >
      <div className="flex absolute justify-center cursor-pointer items-center top-0 bottom-0 z-10 w-full bg-black opacity-20">
        {isSubmitting ? <Loader /> : <FaPlus size={54} color="white" />}
      </div>
      <label htmlFor="upload" className="block w-full h-96">
        <Image
          src={value.length ? value : "https://placehold.co/600x400?text=Image"}
          alt={value ?? ""}
          fill
          className="rounded-2xl overflow-hidden object-cover"
          role="img"
        />
        <input
          disabled={isSubmitting}
          ref={inputRef}
          type="file"
          accept=".png, .jpg, .jpeg .avif"
          hidden
          onChange={(event) => handleImageUpload(event)}
          data-testid="hidden-input"
        />
      </label>
    </div>
  );
};

export default Uploadcomponent;
