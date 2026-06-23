import React from 'react';
import { Link } from 'react-router';

interface ProductCardProps {
  id: string;
  handle?: string;
  title: string;
  price: string;
  imageUrl?: string;
  category?: string;
}

export default function ProductCard({ handle, title, price, imageUrl, category = "COMPOSTABLE GARBAGE BAG" }: ProductCardProps) {
  return (
    <Link to={handle ? `/products/${handle}` : '#'} className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[330px] hover:opacity-80 transition-opacity">
      <div className="bg-[#e9e9e9] h-[445px] overflow-clip relative shrink-0 w-full flex items-center justify-center">
        {imageUrl ? (
          <div className="absolute left-0 size-[330px] top-[58px]">
            <img 
              alt={title} 
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
              src={imageUrl} 
            />
          </div>
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[3px] items-start leading-none not-italic relative shrink-0 text-[#4c4b4d] text-[16px] flex-1">
          <p className="font-['Cabinet_Grotesk:Bold',sans-serif] relative shrink-0 w-full truncate" title={title}>{title}</p>
          <p className="font-['Cabinet_Grotesk:Regular',sans-serif] relative shrink-0 w-full">{category}</p>
        </div>
        <div className="bg-[#4c4b4d] content-stretch flex h-[32px] items-center justify-center overflow-clip px-[12px] py-[7px] relative shrink-0 min-w-[57px]">
          <p className="[word-break:break-word] font-['Cabinet_Grotesk:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-white whitespace-nowrap">
            <span className="font-['Cabinet_Grotesk:Bold',sans-serif] leading-none text-[12.9px]">₹</span>
            <span className="font-['Cabinet_Grotesk:Bold',sans-serif] leading-none text-[20px]">{price}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
