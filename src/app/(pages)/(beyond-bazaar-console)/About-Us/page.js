import Link from "next/link";
export const metadata = {
  title: {
    absolute: "About Page",
  },
  description: "Discover the heart and soul behind Beyond Bazar. Uncover our passion for quality, innovation, and customer satisfaction. Learn about our journey, values, and the team that makes every shopping experience unforgettable. Join us on this exciting adventure as we redefine the world of online shopping, one satisfied customer at a time.",
};
export default function Page() {
  

  return (
    <div className="bg-white py-10 px-6 navMargin minScreen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">About Us</h1>
        <p className="text-gray-600 mb-6">
          Welcome to our eCommerce store! We are passionate about delivering
          high-quality products and providing an exceptional shopping experience
          for our customers.
        </p>

        <h2 className="text-xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-600 mb-6">
          Founded in 2024, our company has been dedicated to describe your
          mission or purpose. Over the years, we have built a reputation for
          mention any significant achievements or milestones.
        </p>

        <h2 className="text-xl font-semibold mb-4">Meet the Team</h2>
        <p className="text-gray-600 mb-6">
          At Your Beyond Bazar, our team is composed of dedicated and talented
          individuals who work tirelessly to bring you the best products and
          services. Meet some of our key team members: Rajneesh , Ashish Gupta... etc.

        </p>

        <h2 className="text-xl font-semibold mb-4">Employee Handbook</h2>
        <p className="text-gray-600 mb-6">
          Our Employee Handbook outlines our company's policies, values, and
          guidelines. It provides important information for our employees to
          ensure a productive and inclusive work environment.

        </p>

        <h2 className="text-xl font-semibold mb-4">Careers</h2>
        <p className="text-gray-600 mb-6">
          Join our growing team and become a part of Your Beyond Bazar. We offer
          exciting career opportunities in various departments. Check our
          Careers page to view current job openings and apply.

        </p>

        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">
          If you have any questions or need assistance, please don't hesitate to
          contact us. You can reach us at contact information.
        <Link className="text-blue-600 hover:underline" href="/contact-us">(link)
        </Link>
        </p>


      </div>
    </div>
  );
};

