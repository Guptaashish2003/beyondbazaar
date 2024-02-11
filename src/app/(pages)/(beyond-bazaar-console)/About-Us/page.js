import React from "react";

export const metadata = {
  title: {
    absolute: "About Page",
  },
  description: "This is the about",
};
const AboutUs = () => {
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
          Founded in [Year], our company has been dedicated to [describe your
          mission or purpose]. Over the years, we have built a reputation for
          [mention any significant achievements or milestones].
        </p>

        <h2 className="text-xl font-semibold mb-4">Meet the Team</h2>
        <p className="text-gray-600 mb-6">
          At [Your Brand Name], our team is composed of dedicated and talented
          individuals who work tirelessly to bring you the best products and
          services. Meet some of our key team members:
          {/* Add team member information here */}
        </p>

        <h2 className="text-xl font-semibold mb-4">Employee Handbook</h2>
        <p className="text-gray-600 mb-6">
          Our Employee Handbook outlines our company's policies, values, and
          guidelines. It provides important information for our employees to
          ensure a productive and inclusive work environment.
          {/* Add a link to the Employee Handbook here */}
        </p>

        <h2 className="text-xl font-semibold mb-4">Careers</h2>
        <p className="text-gray-600 mb-6">
          Join our growing team and become a part of [Your Brand Name]. We offer
          exciting career opportunities in various departments. Check our
          Careers page to view current job openings and apply.
          {/* Add a link to the Careers page here */}
        </p>

        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">
          If you have any questions or need assistance, please don't hesitate to
          contact us. You can reach us at [contact information].
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
