import { Collapse } from "@mantine/core";
import { useState } from "react";

export default function FaqSection() {
  const faqs = [
    { question: "What is Netflix?", answer: "Netflix is a streaming service..." },
    { question: "How much does Netflix cost?", answer: "Plans start at..." },
    { question: "Where can I watch?", answer: "Watch anywhere on..." },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-black">
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <FaqItem key={i} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="bg-gray-800 rounded px-4 py-3 cursor-pointer" onClick={() => setOpened(!opened)}>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{question}</h3>
        <span>{opened ? "-" : "+"}</span>
      </div>
      {opened && <p className="mt-2 text-gray-300">{answer}</p>}
    </div>
  );
}
