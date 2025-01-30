import React, { useState, useEffect } from 'react';

const bannerData = [
  {
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
    quote: "Discover Amazing Deals",
    subtext: "Your one-stop shop for the best products at great prices"
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    quote: "Shop Smarter, Live Better",
    subtext: "Curated selections of premium products at unbeatable prices"
  }
];

export const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(current => (current + 1) % bannerData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      {bannerData.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4 transform transition-transform duration-1000">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.quote}</h1>
              <p className="text-xl md:text-2xl">{slide.subtext}</p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};