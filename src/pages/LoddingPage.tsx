const LoddingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-16 h-16">
        {/* 12 Dots */}
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-black rounded-full animate-fade"></div>
        <div className="absolute top-2 left-[85%] w-2 h-2 bg-black rounded-full animate-fade animation-delay-100"></div>
        <div className="absolute top-5 left-[97%] w-2 h-2 bg-black rounded-full animate-fade animation-delay-[200ms]"></div>
        <div className="absolute top-[70%] left-[85%] w-2 h-2 bg-black rounded-full animate-fade animation-delay-[300ms]"></div>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-black rounded-full animate-fade animation-delay-[400ms]"></div>
        <div className="absolute top-[70%] left-[15%] w-2 h-2 bg-black rounded-full animate-fade animation-delay-[500ms]"></div>
        <div className="absolute top-5 left-[3%] w-2 h-2 bg-black rounded-full animate-fade animation-delay-[600ms]"></div>
        <div className="absolute top-2 left-[15%] w-2 h-2 bg-black rounded-full animate-fade animation-delay-[700ms]"></div>
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-black rounded-full animate-fade animation-delay-[800ms]"></div>
        <div className="absolute top-2 left-[85%] w-2 h-2 bg-black rounded-full animate-fade animation-delay-[900ms]"></div>
        <div className="absolute top-5 left-[97%] w-2 h-2 bg-black rounded-full animate-fade animation-delay-[1000ms]"></div>
        <div className="absolute top-[70%] left-[85%] w-2 h-2 bg-black rounded-full animate-fade animation-delay-[1100ms]"></div>
      </div>
    </div>
  );
};

export default LoddingPage;
