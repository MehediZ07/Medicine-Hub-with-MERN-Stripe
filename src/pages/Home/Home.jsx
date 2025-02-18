import { Helmet } from "react-helmet-async";

import Medicines from "../../components/Home/Medicines";
import HeroSlider from "../../components/Home/HeroSlider";
import Categories from "../../components/Home/Categories";
import Container from "../../components/Shared/Container";
import FeaturesSection from "../../components/Home/FeaturesSection";

import OursPartner from "../../components/Home/OursPartner";

const Home = () => {
  const reviews = [
    {
      name: "John Doe",
      review: "Great products and super fast delivery. Highly recommended!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Lee",
      review:
        "Affordable pricing and excellent customer service. Will buy again!",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Mike Brown",
      review: "Very reliable and authentic medicines. Trustworthy website!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    {
      name: "Emma Watson",
      review: "Easy to navigate and order. Got my delivery within 2 days!",
      rating: 4.5,
      image: "https://randomuser.me/api/portraits/women/37.jpg",
    },
  ];

  const faqs = [
    {
      question: "How long does delivery take?",
      answer: "Delivery usually takes 2-5 business days.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer refunds within 7 days of purchase.",
    },
    {
      question: "Can I track my order?",
      answer: "Yes, you will receive a tracking link after your order ships.",
    },
  ];

  return (
    <div>
      <Helmet>
        <title> Medicine Hub | Home</title>
      </Helmet>

      <Container>
        <HeroSlider slider={true} sliderImageInput={false} />
        <Categories category={true} addCategory={false} />
        <Medicines />
        <OursPartner />
        <FeaturesSection />
        <div className="space-y-16">
          {/* Reviews Section */}
          <section className=" py-12">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6 text-[var(--first-color)]">
                Customer Reviews
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {reviews.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg p-6 rounded-2xl border-t-4 border-[var(--second-color)] transition-all hover:scale-105 hover:shadow-2xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-full mx-auto border-4 border-[var(--second-color)]"
                    />
                    <p className="text-gray-700 italic mt-4">"{item.review}"</p>
                    <h4 className="mt-4 font-bold text-[var(--first-color)]">
                      - {item.name}
                    </h4>
                    <div className="mt-2 flex justify-center text-[var(--second-color)] text-lg">
                      {"⭐".repeat(Math.floor(item.rating))}{" "}
                      {item.rating % 1 !== 0 && "⭐️"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="bg-first-color text-white py-12 text-center rounded-xl">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl font-bold">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-lg mt-2">
                Stay updated with exclusive discounts and new arrivals!
              </p>
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-3 w-full sm:w-80 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--second-color)]"
                />
                <button className="bg-[var(--second-color)] px-6 py-3 rounded-lg font-bold transition-all border-2 border-white solid hover:text-[var(--first-color)] shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="py-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-[var(--first-color)] mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="collapse collapse-arrow bg-base-200"
                  >
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold text-lg text-[var(--first-color)]">
                      {faq.question}
                    </div>
                    <div className="collapse-content text-gray-600">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Home;
