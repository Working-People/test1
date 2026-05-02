import "./globals.css";

export const metadata = {
  title: "VoltMart 电子元器件商城",
  description: "面向工程师、创客和维修工作室的一站式电子元器件采购页面。"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
