import React from 'react';


const About = () => {
  return (     
      <div className="about-page container mx-auto p-5">
        <h2 className="text-4xl font-bold text-center mb-5">About Us</h2>
        <p className="text-lg text-center mb-5">
          Welcome to Foodie Haven, your ultimate destination for delicious meals delivered straight to your door!
        </p>

        <section className="mission-section mb-8">
          <h3 className="text-3xl font-semibold mb-3">Our Mission</h3>
          <p className="text-lg">
            At Foodie Haven, we believe that great food should be accessible to everyone. Our mission is to provide a seamless and enjoyable food ordering experience, bringing you the best local restaurants right at your fingertips.
          </p>
        </section>

        <section className="values-section mb-8">
          <h3 className="text-3xl font-semibold mb-3">Our Values</h3>
          <ul className="list-disc pl-5">
            <li className="text-lg mb-2">🌟 Quality: We partner with top-notch restaurants that prioritize quality ingredients and exceptional service.</li>
            <li className="text-lg mb-2">🤝 Community: Supporting local businesses is at the heart of what we do. We strive to uplift our community with every order.</li>
            <li className="text-lg mb-2">🚀 Convenience: With just a few clicks, you can order your favorite meals from the comfort of your home or on the go.</li>
            <li className="text-lg mb-2">💚 Sustainability: We are committed to environmentally friendly practices, including eco-friendly packaging and promoting sustainable dining options.</li>
          </ul>
        </section>

        <section className="features-section mb-8">
          <h3 className="text-3xl font-semibold mb-3">Why Choose Us?</h3>
          <p className="text-lg mb-3">
            Here’s what makes Foodie Haven stand out:
          </p>
          <ul className="list-disc pl-5">
            <li className="text-lg mb-2">🍽️ Extensive Selection: From gourmet dishes to everyday meals, our diverse menu offers something for everyone.</li>
            <li className="text-lg mb-2">⏰ Fast Delivery: Enjoy quick and reliable delivery service, ensuring your food arrives hot and fresh.</li>
            <li className="text-lg mb-2">🔒 Secure Ordering: Your safety is our priority. We use secure payment methods and protect your personal information.</li>
          </ul>
        </section>

        <section className="join-us-section mb-8">
          <h3 className="text-3xl font-semibold mb-3">Join Our Foodie Community!</h3>
          <p className="text-lg mb-5">
            Whether you’re a foodie looking for your next meal or a restaurant wanting to reach more customers, we’re here for you. Join us on this delicious journey!
          </p>
          <p className="text-lg font-semibold">
            Start exploring our menu today and experience the joy of ordering food the easy way!
          </p>
        </section>
      </div>
  );
}

export default About;
