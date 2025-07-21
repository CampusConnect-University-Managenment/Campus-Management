import React, { useState } from "react";
import { HelpCircle, Mail, MessageSquare, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I update my password?",
    answer:
      "Go to your profile settings and click on 'Update Password'.",
  },
  {
    question: "How to enroll in a course?",
    answer:
      "Navigate to the 'Courses Enrolled', Click a 'Course Enrollment', and select 'Add New Courses'.",
  },
  {
    question: "Where can I view my grades?",
    answer:
      "You can view your grades in the 'Results' section of your dashboard.",
  },
  {
    question: "How to contact faculty?",
    answer:
      "Go to the Notification and chat.",
  },
];

export default function HelpSupport() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="pt-24 px-8 pb-16 min-h-screen bg-[#F1F5F9]">
      <h1 className="text-4xl font-bold text-[#1D4ED8] mb-6 flex items-center gap-2">
        <HelpCircle className="w-8 h-8 text-[#1D4ED8]" /> Help & Support
      </h1>

      {/* Search Bar */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full max-w-xl px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] transition"
        />
      </div>

      {/* FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all hover:shadow-md border border-gray-100"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#334155]">
                {faq.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>
            {activeIndex === index && (
              <p className="text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support Form */}
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto border border-gray-100">
        <h2 className="text-2xl font-bold text-[#1D4ED8] mb-4 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-[#1D4ED8]" /> Still need help?
        </h2>
        <p className="text-gray-500 mb-6">
          Fill out the form below and our support team will get back to you.
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
          />
          <textarea
            rows="4"
            placeholder="Describe your issue..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
          ></textarea>
          <button
            type="submit"
            className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-6 py-3 rounded-md font-medium transition"
          >
            <Mail className="inline-block w-4 h-4 mr-2" />
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
