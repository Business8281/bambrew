import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

export function ResponsiveLayout({ children, height }: { children: React.ReactNode, height: number }) {
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const targetWidth = 1440;
      setScale(windowWidth < targetWidth ? windowWidth / targetWidth : Math.max(1, windowWidth / targetWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const text = target.textContent?.trim();
    if (!text) return;
    
    // Use exact matches for nav links
    if (text === "HOME" && target.tagName === "P") navigate("/");
    else if (text === "ABOUT US" && target.tagName === "P") navigate("/about");
    else if (text === "IMPACTS" && target.tagName === "P") navigate("/impacts");
    else if (text === "PRODUCTS" && target.tagName === "P") navigate("/products");
    
    // CTA buttons
    else if (text === "SHOP NOW" || text === "Buy now" || text === "ALL PRODUCTS") navigate("/products");
    
    // Product items
    else if (text.includes("COMPOSTABLE GARBAGE BAG") && target.closest("div")?.parentElement) navigate("/products/1");
  };

  return (
    <div 
      className="w-full bg-[#f9f9f9] flex justify-center overflow-hidden"
      style={{ height: height * scale }}
    >
      <div 
        className="origin-top flex justify-center bg-white shadow-xl cursor-pointer"
        style={{ transform: `scale(${scale})`, width: 1440, height }}
        onClick={handleClick}
      >
        <div className="w-[1440px] relative h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
