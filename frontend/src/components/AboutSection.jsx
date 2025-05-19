// frontend/src/components/AboutSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { InfoIcon, Utensils, Users, ClipboardList, ExternalLink } from 'lucide-react';
import Button from './ui/Button';

const aboutImage = 'https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const features = [
  {
    icon: Utensils,
    title: 'Menu Management',
    text: 'Update and organize daily menu offerings with ease.',
  },
  {
    icon: Users,
    title: 'Team Coordination',
    text: 'Collaborate efficiently with kitchen staff and service teams.',
  },
  {
    icon: ClipboardList,
    title: 'Task Tracking',
    text: 'Stay on top of kitchen duties and responsibilities.',
  },
];

const AboutSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#3c2a21] to-[#1a120b] text-amber-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light">
        <div className="absolute top-1/4 left-20 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-600/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl font-dancing bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-600 mb-4">
            Culinary Staff Portal
          </h2>
          <p className="text-lg sm:text-xl text-amber-100/80 max-w-2xl mx-auto">
            Track your kitchen responsibilities, assigned dishes, and team updates — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-8 animate-slide-up">
            <h3 className="text-3xl sm:text-4xl font-bold leading-tight">
              <span className="font-dancing text-4xl sm:text-5xl bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                Empowering Our Staff
              </span>
              <br />
              <span className="inline-block mt-2 text-2xl sm:text-3xl opacity-90 font-light">
                Where Flavors Dance & Memories Bloom
              </span>
            </h3>

            <p className="text-base sm:text-lg opacity-90 leading-relaxed max-w-3xl font-serif italic border-l-4 border-amber-500/60 pl-4 sm:pl-6 py-2 bg-gradient-to-r from-white/5 to-transparent">
              "In our kitchen, passion meets precision. We craft not just meals, but culinary journeys
              that linger on the palate and in the heart."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-amber-900/20 backdrop-blur-sm rounded-xl p-6 border border-amber-800/30 transition-all duration-300 hover:border-amber-600/50 hover:bg-amber-900/30"
                >
                  <div className="p-3 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 inline-block mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold font-dancing text-amber-300 mb-2">{feature.title}</h4>
                  <p className="text-amber-100/80 text-sm">{feature.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link to="/about">
                <Button variant="outline" icon={ExternalLink} iconPosition="right">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative rounded-[2rem] overflow-hidden border-4 border-amber-900/30 hover:border-amber-600/40 transition-all duration-500 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/15 via-transparent to-amber-600/10 mix-blend-overlay" />
              <img
                src={aboutImage}
                alt="Our Kitchen"
                className="w-full h-auto object-cover aspect-[4/5] transform -rotate-1 group-hover:rotate-0 transition-all duration-500"
              />
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-amber-900/30 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
