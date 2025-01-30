import React, { useState, useEffect } from 'react';

const bannerData = [
  {
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a",
    quote: "Connecting You with Quality",
    subtext: "Your trusted partner in online shopping"
  },
  {
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    quote: "Shopping Made Simple",
    subtext: "Discover the joy of hassle-free online shopping"
  }
];

export const AboutUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(current => (current + 1) % bannerData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
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

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          
          <div className="prose prose-lg">
            <p className="mb-6">
              Easy Buy Links was born from a simple yet powerful idea: to make online shopping more 
              transparent, efficient, and trustworthy. In today's digital age, consumers often struggle 
              with finding genuine products and reliable sellers across numerous platforms.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
            <p className="mb-6">
              We're committed to solving the challenges of online shopping by creating a curated 
              marketplace that connects shoppers with verified products from trusted sellers. Our 
              platform serves as a bridge between consumers and legitimate online retailers, ensuring 
              every purchase is genuine and every transaction is secure.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Verified Products: Every item listed on our platform is thoroughly vetted for authenticity.</li>
              <li>Direct Links: Quick access to official product pages, saving you valuable time.</li>
              <li>Price Transparency: Clear pricing information with history tracking.</li>
              <li>Trusted Reviews: Genuine feedback from verified purchasers.</li>
              <li>Customer Support: Dedicated team to assist you with your shopping journey.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
            <p>
              We envision a future where online shopping is completely hassle-free, where every 
              consumer can make informed decisions with confidence, and where quality products are 
              easily accessible to everyone. Through Easy Buy Links, we're making this vision a 
              reality, one purchase at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};