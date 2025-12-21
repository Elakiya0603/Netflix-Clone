import "./globals.css";
import ClientMantineProvider from "./components/ClientMantineProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ zIndex: 0 }}>
        <ClientMantineProvider>
          {children}
        </ClientMantineProvider>
      </body>
    </html>
  );
}
