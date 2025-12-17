"use client";

import { Button } from "@mantine/core";
import React from "react";

type CustomButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  size?: "sm" | "md";
  disabled?: boolean;
  variant?: "primary" | "secondary";
  rightIcon?: React.ReactNode; // optional icon

};

export default function CustomButton({
  children,
  onClick,
  fullWidth = true,
  loading = false,
  size = "md",
  disabled = false,
  variant="primary",
  rightIcon,
}: CustomButtonProps) {
  const height = size === "sm" ? "32px" : "48px";
  const fontSize = size === "sm" ? "14px" : "16px";


  const isPrimary = variant === "primary";

  return (
    <Button
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      rightSection={rightIcon}
      styles={{
        root: {
          width: fullWidth ? "100%" : "auto",
          backgroundColor: isPrimary ? "#e50914" : "#27272a",
          height,
          fontSize,
          padding: size === "sm" ? "0 16px" : "0 24px",
          fontWeight: 600,
          borderRadius: "4px",
          cursor: disabled || loading ? "not-allowed" : "pointer",
          color: "white",
          "&:hover": {
             backgroundColor: isPrimary ? "#f6121d" : "#e50914",

          },
        },
      }}
    >
      {children}
    </Button>
  );
}
