"use client";

import { useRef } from "react";
import { MdChevronRight } from "react-icons/md";

const top10 = [
  { rank: 1, img: "https://occ-0-5690-3663.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABY9k9fs_LBXb9PECBO3Z5XL_mFLN5sa3-nQt2ik0-NcNpHZqvtSMCRkBBF9HcuF39159rMtTlIeVV0vBPw1YoxVfYpckXxEvgtwHl_850c7If2V1-vt9Vk2jVlR4sRh-iEwC.webp" },
  { rank: 2, img: "https://occ-0-5690-3663.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABQFmi2qrQTOShMevIIgOcMdy2h-nqU5swZHnjzJZJbnfTO_oJnzTZp4B8KKOEPMq0DzI2z5-XE4bjchCAQYlPvWR1jBzggTo3sM.webp" },
  { rank: 3, img: "https://occ-0-5690-3663.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABTELBclTkAkJgPaHohb86tSczXpMkZ5Xm0gaL2SgOH9fV5qJEBJsRVyWJgxYba7AnGM4u-MWP3HXAh8lA_H5IZS24mvCNyq65YI.webp" },
  { rank: 4, img: "https://occ-0-5690-3663.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABTJf3e14TtZ2Z3216UaphDq5nf1SaFyC-0R59wDCSyGdNROqYPTHg8g8SU0kbcn61BMumEkghBN8r11S6_bhQvNJ4oQD4oECM-M.webp" },
  { rank: 5, img: "https://occ-0-5690-3663.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABQyNT9Mdd2wR9KVzh2iO_T3rTEydvDSlf0_4EnLYou_zEgzr5juLda9NmQT2srWqiFh-7PKVRzRgoB5Eg-xA5DQHFPeSd1MHDzryhJqxIeayTICsi6DMPp4I8uH8NdtaV5Ji.webp" },
  { rank: 6, img: "https://occ-0-5690-3663.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABXofeOBMXfake2UpvS5aFutul0vL1os5iYG20jqPr6_CIZz7qEqvCqNXmIU067p1VhsR0lI1FDQBpMdmsupJ_6BaGVGcv-8SnP9DEaXEY3Jp8rvUHARX3b1iQhLn3rpbw8W_.webp" },
  { rank: 7, img: "https://occ-0-5690-3663.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABeCCglLBrw6BajbQyAT0g08g88dk_z2qTbyI1Y9WfinR4rX-udHODVOR5e_XvOu4hpi1TzZs4NJnERhCyHkprPNWdMFfI4zBQtmF3xq6cMrVC_JoV4HU78XwY2lWKOp2qoNs.webp" },
  { rank: 8, img: "https://occ-0-5690-3663.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABc2CT8a8QteV-FIoyJorf5IObO8cP5mW6__0zAMwuCEf7YOUWl0LUWBmpNz7mLx6HHDEOsxvtqC7P8sKxC6h9jLzwaaEHxrSrzY.webp" },
  { rank: 9, img: "https://occ-0-5690-3663.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABbDADc_093SajQ3Qhm65KgM-nWCw86OXxqOMzu7cRSg1_mY1ETgyb-dH6FZZMpwdZc3jaXvKb7MbZLAfZFL_SB3IBoi_77WpD7k.webp" },
  { rank: 10, img: "https://occ-0-5690-3663.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABT48t2lnrDw5Yy88i7xEdtDZgbcabVFtNIthHbfI02lgLiQ-4IDQCyt1moitpg_nHxT_7c2SGXRxmIAeQuW7yd7n50EX_h0KUgQ.webp" },
];

export default function Top10Carousel() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 600, behavior: "smooth" });
  };

  return (
    <div className="relative mt-16">
      <h2 className="text-xl font-semibold mb-4 px-10">
        Trending Now
      </h2>

      {/* CENTER CONTAINER */}
      <div className="relative px-10 overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-hidden"
        >
          {top10.map((item) => (
            <div
              key={item.rank}
              className="relative min-w-[180px] h-[260px]"
            >
              {/* Rank number */}
              <span
                className="absolute -left-6 bottom-0 text-[90px] font-extrabold text-black leading-none"
                style={{
                  WebkitTextStroke: "3px white",
                }}
              >
                {item.rank}
              </span>

              {/* Poster */}
              <img
                src={item.img}
                alt={`Rank ${item.rank}`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full hover:bg-black"
        >
          <MdChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
