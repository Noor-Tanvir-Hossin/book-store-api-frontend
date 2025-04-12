import book from "@/assets/images/janko-ferlic-sfL_QOnmy00-unsplash.jpg";
const Hero = () => {
  return (
    <section className="dark:bg-gray-100 dark:text-gray-800 my-3">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-6xl font-bold leading-none sm:text-6xl">
            Buy and Sell your text books at the best price
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            {/* Dictum aliquam porta in condimentum ac integer
            <br className="hidden md:inline lg:hidden" />
            turpis pulvinar, est scelerisque ligula sem */}
            From applied literature to educational resources, we have a lot
            textbooks to offer you. We provide ony the best books for rent.
          </p>
          {/* <input type="search" name="Search" placeholder="Search..." className="w-full h-12 py-2 pl-10 text-sm rounded-md sm:w-auto outline-secondary dark:bg-gray-100 dark:text-gray-800 " /> */}
          {/* <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
          
          </div> */}
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src={book}
            alt=""
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
