"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Share2, Trophy, Image as ImageIcon } from "lucide-react";

// Import the EventCarousel component we just created
import { ChevronLeft, ChevronRight } from "lucide-react";

const EventCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const events = [
    {
      id: 1,
      title: "Summer Gaming Festival",
      description: "Join us for the biggest gaming event of the summer!",
      price: "From $10",
      image: "/api/placeholder/320/180",
    },
    {
      id: 2,
      title: "Esports Championship",
      description: "Watch top teams compete for the grand prize!",
      price: "From $25",
      image: "/api/placeholder/320/180",
    },
    {
      id: 3,
      title: "Game Developer Workshop",
      description: "Learn from industry experts in this hands-on workshop",
      price: "From $15",
      image: "/api/placeholder/320/180",
    },
    {
      id: 4,
      title: "Virtual Reality Expo",
      description: "Experience the future of gaming in VR",
      price: "From $20",
      image: "/api/placeholder/320/180",
    },
  ];

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((current) => (current + 1) % events.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex(
        (current) => (current - 1 + events.length) % events.length
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleDotClick = (index: number) => {
    if (!isAnimating && index !== activeIndex) {
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <h2 className="text-2xl font-bold text-white mb-6">Featured Events</h2>

      <div className="relative">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {events.map((event) => (
              <div key={event.id} className="w-full flex-shrink-0 px-2">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-xl overflow-hidden">
                  <div className="relative p-4">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl" />

                    <div className="relative z-10">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      <h3 className="text-white text-xl font-bold mb-2">
                        {event.title}
                      </h3>

                      <p className="text-gray-200 text-sm mb-4">
                        {event.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400 font-semibold">
                          {event.price}
                        </span>
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
          disabled={isAnimating}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === activeIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Adjust grid for responsiveness
interface EventIdeaProps {
  title: string;
  description: string;
}

const EventIdea = ({ title, description }: EventIdeaProps) => (
  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>
    </div>
  </div>
);

// Adjust grid for responsiveness
interface TournamentProps {
  title: string;
  description: string;
  prizePool: string;
}

const Tournament = ({ title, description, prizePool }: TournamentProps) => (
  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <h3 className="text-white text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-300 text-sm mb-2">{description}</p>
        <p className="text-yellow-400 font-semibold">Prize Pool: {prizePool}</p>
      </div>
      <button className="px-4 py-2 bg-green-600/80 hover:bg-green-600 text-white rounded-lg transition-colors duration-200">
        Join Now
      </button>
    </div>
  </div>
);

// Adjust grid for responsiveness
interface GalleryImageProps {
  src: string;
  title: string;
}

const GalleryImage = ({ src, title }: GalleryImageProps) => (
  <div className="group relative overflow-hidden rounded-xl">
    <img
      src={src}
      alt={title}
      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
      </div>
    </div>
  </div>
);

export default function EventManagement() {
  const [activeTab, setActiveTab] = useState("feed");
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const ideas = [
    {
      title: "Community Tournament",
      description:
        "Monthly tournament series for all skill levels with community-voted game selection.",
    },
    {
      title: "Game Launch Party",
      description:
        "Celebrate new game releases with midnight launch events and competitions.",
    },
    {
      title: "Charity Gaming Stream",
      description:
        "Support great causes with a charity-focused live-streamed event.",
    },
  ];

  const tournaments = [
    {
      title: "Esports Showdown",
      description:
        "Compete in a professional esports tournament for amazing prizes.",
      prizePool: "$10,000",
    },
    {
      title: "Battle Royale",
      description: "The ultimate survival tournament where only one can win.",
      prizePool: "$5,000",
    },
    {
      title: "Speedrun Championship",
      description:
        "Race against others to complete games in the shortest time possible.",
      prizePool: "$3,000",
    },
  ];

  const gallery = [
    { src: "/api/placeholder/320/180", title: "Epic Victory Moment" },
    { src: "/api/placeholder/320/180", title: "Tournament Crowd" },
    { src: "/api/placeholder/320/180", title: "Gaming Setup" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className="relative flex-1 bg-gray-900 text-white overflow-auto">
        {/* Mobile-only blur overlay */}
        <div
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-10 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } md:hidden`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Main content container */}
        <div
          className={`p-4 pt-0 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "ml-0" : "ml-0"
          } md:${isSidebarOpen ? "ml-64" : "ml-0"}`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onMenuClick={() => setSidebarOpen(true)}
          />

          {/* Featured Events Carousel */}
          <EventCarousel />

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Event Ideas</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea, index) => (
                <EventIdea key={index} {...idea} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Tournaments</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournaments.map((tournament, index) => (
                <Tournament key={index} {...tournament} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Gallery</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item, index) => (
                <GalleryImage key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
