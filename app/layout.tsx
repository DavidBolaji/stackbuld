import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import Wrapper from "@/components/layout/wrapper";
import Header from "@/components/ui/header/header";
import HandleNotification from "@/components/notification/handle-notification";
import { Notification } from "@/components/notification/notification-context";

const barlow = Barlow({ weight: ["100", "400", "800"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Products Page",
  description:
    "Davia Nigeria the #1 of Online Product Shopping in Nigeria - Shop Online All Wears",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={barlow.className}>
        <Notification>
          <Header />
          <Wrapper>{children}</Wrapper>
          <HandleNotification />
        </Notification>
        <div  id="modal-root"></div>
        <div id="notification-root"></div>
      </body>
    </html>
  );
}
