import { Button } from "@/components/ui/button";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-[#FCFFDA] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 pt-[5rem] relative z-10">
          {/* Hero Section */}
          <div className="mb-20">
            <h1 className="text-[7rem] font-Anton text-stroke-2 text-stroke-black">
              <div className="flex items-center gap-2">
                Host <span className="text-[#1e90ff]">modern events</span>
                <div className="w-12 h-12 rounded-full bg-orange-500 rotate-[30deg]" />
              </div>
              <div>
                for <span className="text-[#00c4a7]">modern people</span>
              </div>
            </h1>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Button variant="primary" className="px-6 py-[1.2rem]">
                Host Event
                <span className="text-xl font-bold">→</span>
              </Button>
              <Button variant="secondary" className="px-6 py-[1.2rem]">
                Explore Event
              </Button>
            </div>
          </div>
        </div>

        {/* <div className="mt-40">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-4">Find a event</h2>
            <div className="flex gap-2 max-w-2xl">
              <input
                type="text"
                placeholder="Search events..."
                className="flex-1 px-4 py-3 rounded-lg border-2 border-black bg-white"
              />
              <button className="px-8 py-3 bg-orange-500 rounded-lg font-semibold">
                Search
              </button>
            </div>
          </div>

          <div
            className="mt-20 absolute bottom-0 left-0 right-0 h-[45%] bg-[#1e90ff] transform -skew-y-6 origin-right -z-0"
            style={{ transform: "skewY(-6deg)" }}
          />
        </div> */}
      </div>
    </>
  );
};

export default Home;
