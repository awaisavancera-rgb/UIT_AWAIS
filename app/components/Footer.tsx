import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      {/* Top CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">Let's Get Moving Today</h3>
            <p className="text-gray-300">Start your journey towards excellence</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 h-11">Apply Now</Button>
        </div>
      </div>

      {/* Main footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About UIT University</h4>
            <p className="text-gray-300 leading-relaxed mb-4">
              Empowering students to achieve excellence in education and research.
            </p>
            <div className="flex items-center gap-4 text-gray-300">
              <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram className="w-5 h-5" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/courses" className="hover:text-white">Courses</Link></li>
              <li><Link href="/events" className="hover:text-white">Events</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/courses/engineering" className="hover:text-white">Engineering</Link></li>
              <li><Link href="/courses/computing" className="hover:text-white">Computer Science</Link></li>
              <li><Link href="/courses/management" className="hover:text-white">Business</Link></li>
              <li><Link href="/courses/medical" className="hover:text-white">Medical</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3"><MapPin className="w-5 h-5 mt-0.5" /> 123 University Avenue, City, State 12345</li>
              <li className="flex items-center gap-3"><Phone className="w-5 h-5" /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-3"><Mail className="w-5 h-5" /> info@uitu.edu.pk</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <div>© 2025 UIT University. All Rights Reserved.</div>
            <div className="flex items-center gap-6 mt-3 md:mt-0">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
