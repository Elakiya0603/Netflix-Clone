"use client";

import { TextInput } from "@mantine/core";

type CustomTextInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  variant?: "filled" | "outlined"; // 🔥 new
  className?: string;
  pageType?:string;
};

export default function CustomTextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  variant="filled",
  pageType="none",
  className,
}: CustomTextInputProps) {
  return (
    <TextInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      styles={{
        root: {
          border: "none",
        },
        input: {
           backgroundColor:
            variant === "outlined" ? "rgba(0,0,0,0.7)" : "#27272a",   
          color: "white",
           border:
            variant === "outlined"
              ? "1px solid #6b7280" 
              : "none",
          outline: "none",
          padding: pageType==="Welcome"?"10px 20px":"none",
          boxShadow: "none",
          width: "100%",
        },
      }}
    />
  );
}
