import Team from "@/assets/images/annie-spratt-QckxruozjRg-unsplash.jpg"
const About = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          About <span className="text-[#FD6E0A]">Us</span>
        </h1>
        <p className="text-lg text-gray-600">
          Discover the story behind our journey and how we bring the best
          products to you.
        </p>
      </div>

      <div className="container mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="border border-e-red-200">
          <img
            className="rounded-lg shadow-md  w-full h-full object-cover "
            src={Team}
            alt="Our Team"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Empowering Shopping with Excellence
          </h2>
          <p className="text-gray-600 leading-7 mb-6">
            At our BookBridge Project, we aim to revolutionize online shopping by
            delivering an unparalleled customer experience. Whether you're
            searching for the latest gadgets, trendy fashion, or everyday
            essentials, we have you covered with a diverse collection of
            high-quality products.
          </p>
          <p className="text-gray-600 leading-7">
            Our mission is to combine innovation, convenience, and trust to
            create an ecosystem where shopping becomes a joy. We're not just an
            e-commerce platform; we're your reliable partner in making life
            easier and more exciting.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold  mb-2">
              Customer First
            </h3>
            <p className="text-gray-600">
              We prioritize customer satisfaction above all, ensuring every
              interaction leaves you smiling.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold  mb-2">
              Quality Assurance
            </h3>
            <p className="text-gray-600">
              Only the best products make it to our catalog, guaranteeing
              quality and reliability in every purchase.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold  mb-2">
              Innovation
            </h3>
            <p className="text-gray-600">
              We're always evolving to bring you cutting-edge solutions that
              simplify your shopping experience.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-whtie rounded-lg shadow-md mt-16 py-12 ">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4">Join Us on Our Journey</h2>
          <p className="text-lg mb-6">
            Be part of a community that values trust, quality, and convenience.
            Experience shopping like never before.
          </p>
          <a
            href="/shop"
            className="px-8 py-3 bg-[#FD6E0A] text-white font-medium rounded shadow-md hover: transition"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
