import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import Footer from "@/components/home/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
return (
  <html lang="en">
    <head>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
    </head>
    <body>
      <Navbar/>

      {children}
      <Footer/>
    </body>
  </html>
);
}