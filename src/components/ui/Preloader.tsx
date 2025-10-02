// components/ui/Preloader.tsx
import React, { useState, useEffect } from 'react';
import { Wrench, Car, Settings, Zap } from 'lucide-react';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const loadingSteps = [
    { icon: Car, text: "Starting Engine..." },
    { icon: Settings, text: "Loading Components..." },
    { icon: Wrench, text: "Preparing Tools..." },
    { icon: Zap, text: "Almost Ready..." }
  ];

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const stepDuration = duration / 100;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;
        
        // Update current step based on progress
        if (newProgress <= 25) setCurrentStep(0);
        else if (newProgress <= 50) setCurrentStep(1);
        else if (newProgress <= 75) setCurrentStep(2);
        else setCurrentStep(3);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          // Small delay before hiding preloader
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
        }
        
        return newProgress;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-white from-gray-900 via-black to-gray-800 flex items-center justify-center z-50">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-white mb-2">
            <span className="text-background">Garu Tech </span>
          </div>
          <p className="text-gray-400 text-lg">Premium Garage Equipment</p>
        </div>
        
        {/* Animated Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-600 rounded-full animate-spin border-t-blue-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <CurrentIcon className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="mb-8">
          <p className="text-background text-xl font-medium mb-2">
            {loadingSteps[currentStep].text}
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-red-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-gray-400 text-sm">
            <span>0%</span>
            <span>{progress}%</span>
            <span>100%</span>
          </div>
        </div>
        
        {/* Loading Steps Indicators */}
        <div className="flex justify-center space-x-4 mt-8">
          {loadingSteps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={index}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-500'
                }`}
              >
                <StepIcon className="w-6 h-6" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Preloader;