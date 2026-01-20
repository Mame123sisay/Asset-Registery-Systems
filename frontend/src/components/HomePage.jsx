export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-blue-400 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
          <img
            src="hopr-logo.png" // replace with actual institution image
            alt="Hopr Ethiopia ICT Asset Registry"
            className="w-full md:w-1/2 rounded-lg shadow-lg mb-6 md:mb-0"
          />
          <div className="md:ml-10">
            <h1 className="text-4xl font-bold mb-4">
              HOPR Ethiopia ICT Asset Registry System
            </h1>
            <p className="text-lg">
              A centralized system designed to strengthen transparency, accountability, and efficiency
              in managing ICT assets for Ethiopia’s Parliament and public institutions.
            </p>
          </div>
        </div>
      </header>

      {/* About Us Section */}
      <section id='about'className="flex-1 bg-gray-100 py-16  ">
        <div className="max-w-5xl mx-auto px-6 text-center ">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-gray-700 leading-relaxed">
            HOPR Ethiopia, in collaboration with the Parliament, has developed the ICT Asset Registry
            System to modernize asset management practices. Our mission is to ensure that every ICT
            resource is tracked, maintained, and utilized effectively to support governance and
            national development. By leveraging technology, we aim to reduce redundancy, improve
            accountability, and provide accurate data for decision-making.
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
          <form className="max-w-lg mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your Name"required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="email"
              placeholder="Your Email"required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <textarea
              placeholder="Your Message"required
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Hopr Ethiopia ICT Asset Registry System. All rights reserved.</p>
          <div className="space-y-2 mt-4 md:mt-0 text-sm">
            <p>Email: <a href="mailto:info@hoprethiopia.org" className="underline">info@hoprethiopia.gov.et</a></p>
            <p>Phone: +251-11-123-4567</p>
            <p>Address: Parliament Building, Addis Ababa, Ethiopia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
