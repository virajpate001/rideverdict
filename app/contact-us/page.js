import ContactForm from '@/components/ContactForm';
import site from '@/content/site.json';
export const metadata = { title: 'Contact Us', alternates: { canonical: '/contact-us/' } };
export default function Contact() {
  return (
    <div className="container narrow page-top pad-b">
      <h1>Contact Us</h1>
      <p>Questions, feedback or collaboration ideas? Email <a href={`mailto:${site.email}`}>{site.email}</a> or use the form.</p>
      <ContactForm />
    </div>
  );
}