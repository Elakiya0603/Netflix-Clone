"use client";

import { useRouter } from "next/navigation";
import CustomButton from "./components/customButton"; // optional if you want custom buttons
import { TextInput } from "@mantine/core";
import { MdArrowForwardIos, MdLanguage } from "react-icons/md";

// Section Components
import Top10Section from "./components/top10Section";
import FeaturesSection from "./components/featuresSection";
import FaqSection from "./components/faqSection";
import CustomTextInput from "./components/customTextInput";
import { useState } from "react";
import Curve from "./components/curve";

export default function Home() {
  const router = useRouter();
  const [email,setEmail]=useState("");

  return (
    <div className="bg-black text-white w-full min-h-screen">
      {/* Header */}
      <header className=" absolute top-0 left-0 flex justify-between items-center px-26 py-6 w-full z-50 bg-transparent">
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
    alt="Netflix"
    className="h-9 md:h-10"
  />

  <div className="flex items-center gap-4">
    {/* Language Selector */}
    <div className="relative">
      <select
        className="bg-black/70 border border-gray-500 text-white px-4 py-2 pl-9 rounded text-sm focus:outline-none"
      >
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
        <option value="hi">हिंदी</option>
      </select>

      <MdLanguage
        size={18}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white pointer-events-none"
      />
    </div>

    {/* Sign In Button */}
    <button
      onClick={() => router.push("/login")}
      className="bg-red-600 px-6 py-2 rounded hover:bg-red-700 font-semibold text-white"
    >
      Sign In
    </button>
  </div>
</header>


      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 pt-36 md:pt-48"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://assets.nflxext.com/ffe/siteui/vlv3/29b665f6-0a62-4745-b9c2-f617fb7eadc6/web/IN-en-20251208-TRIFECTA-perspective_c78aea89-8f13-4e2c-ba7a-f9b40f53bf8c_large.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "90vh",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Unlimited movies, TV shows and more
        </h1>
        <p className="text-lg md:text-xl mb-6">Watch anywhere. Cancel anytime.</p>
        <p className="text-md mb-6">Ready to watch? Enter your email to create or restart your membership.</p>

        {/* Email Input + Get Started */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl">
          {/* <TextInput
            placeholder="Email address"
            className="flex-1 bg-black/70 text-white placeholder-gray-400 rounded px-4 py-3 focus:outline-none focus:border-white"
          /> */}
          <CustomTextInput
            type="email"
            placeholder="Email address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sm:w-[390px]"
            pageType="Welcome"
          />

          <button className="flex items-center gap-2 bg-red-600 px-6 py-3 rounded font-semibold hover:bg-red-700">
            Get Started
            <MdArrowForwardIos size={18} />
          </button>
        </div>
      </section>

       <Curve/>
      {/* Scrollable Sections */}
      <Top10Section />
      <FeaturesSection />
      <FaqSection />
    </div>
  );
}
