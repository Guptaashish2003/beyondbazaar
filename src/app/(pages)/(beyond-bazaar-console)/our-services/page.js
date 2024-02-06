import React from 'react';

const ServicesPage =() => {
  const services = [
    {
      title: 'Web Development',
      description: 'We specialize in creating responsive and user-friendly websites and web applications that cater to your unique business needs. Our team of developers uses cutting-edge technologies to deliver high-quality solutions.'
    },
    {
      title: 'Web Design',
      description: 'Our talented designers craft visually appealing and engaging website designs. We focus on user experience and aesthetics to ensure that your online presence leaves a lasting impression.'
    },
    {
      title: 'Marketing',
      description: 'We offer comprehensive digital marketing strategies to help your business grow. From SEO and social media marketing to email campaigns and content creation, we have you covered.'
    },
    {
      title: 'Google Ads',
      description: 'Maximize your online visibility and reach your target audience through Google Ads. Our certified experts can create and manage effective ad campaigns to boost your business.'
    },
  ];

  return (
    <div className="bg-white py-10 px-6 navMargin minScreen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Our Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Made in India</h2>
          <p className="text-gray-600">
            E-commerce in India thrives with a diverse array of 'Made in India' products, embracing local production for online consumers.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Fast Delivery</h2>
          <p className="text-gray-600">
            Orders to metro cities reach in 5-7 working days.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Value-driven</h2>
          <p className="text-gray-600">
            We provide unbeatable value with affordable, top-quality products.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
