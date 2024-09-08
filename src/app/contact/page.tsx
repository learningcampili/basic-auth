import ContactForm from "@/components/contact/ContactForm";
import React from "react";

const ContactPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center gap-5 w-full">
      <ContactForm />
    </div>
  );
};

export default ContactPage;
