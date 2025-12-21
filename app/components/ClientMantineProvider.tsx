"use client";
import React from "react";
import { MantineProvider } from "@mantine/core";

export default function ClientMantineProvider({ children }: { children: React.ReactNode }) {
  return <MantineProvider>{children}</MantineProvider>;
}
