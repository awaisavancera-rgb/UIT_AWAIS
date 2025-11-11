'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ArrowRight
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'About UIT', href: '/about' },
        { name: 'Admissions', href: '/admissions' },
        { name: 'Academic Programs', href: '/courses' },
        { name: 'Faculty', href: '/faculty' },
        { name: 'Research (MERL)', href: '/merl' },
        { name: 'Campus Life', href: '/about#campus' }
    ];

    const academicPrograms = [
        { name: 'Engineering', href: '/courses?category=engineering' },
        { name: 'Computer Science', href: '/courses?category=computer-science' },
        { name: 'Business Administration', href: '/courses?category=business' },
        { name: 'Management Sciences', href: '/courses?category=management' },
        { name: 'All Programs', href: '/courses' }
    ];

    const resources = [
        { name: 'Student Portal', href: '#' },
        { name: 'Library', href: '#' },
        { name: 'Career Services', href: '#' },
        { name: 'Alumni Network', href: '#' },
        { name: 'CMS Demo', href: '/cms-demo' },
        { name: 'Contact Support', href: '/contact' }
    ];

    return (
        <footer className="bg-slate-900 text-white">
            {/* Newsletter Section */}
            <div className="bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                                Stay Connected with UIT University
                            </h3>
                            <p className="text-primary-foreground/90">
                                Get the latest updates on admissions, events, and academic programs delivered to your inbox.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/70"
                            />
                            <Button variant="secondary" className="whitespace-nowrap">
                                Subscribe
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* University Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-6">
                            <div className="h-16 w-auto mr-3">
                                <img 
                                    src="/images/uit-logo.png" 
                                    alt="UIT University Logo" 
                                    className="h-full w-full object-contain"
                                />
                            </div>

                        </div>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Excellence in education, innovation in research, and commitment to developing future leaders
                            in technology, business, and management.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center text-slate-300">
                                <MapPin className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                                <span className="text-sm">123 University Avenue, Education City</span>
                            </div>
                            <div className="flex items-center text-slate-300">
                                <Phone className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center text-slate-300">
                                <Mail className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                                <span className="text-sm">info@uit.edu</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-300 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Academic Programs */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Academic Programs</h4>
                        <ul className="space-y-3">
                            {academicPrograms.map((program) => (
                                <li key={program.name}>
                                    <Link
                                        href={program.href}
                                        className="text-slate-300 hover:text-primary transition-colors text-sm"
                                    >
                                        {program.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Resources</h4>
                        <ul className="space-y-3">
                            {resources.map((resource) => (
                                <li key={resource.name}>
                                    <Link
                                        href={resource.href}
                                        className="text-slate-300 hover:text-primary transition-colors text-sm"
                                    >
                                        {resource.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                        {/* Copyright */}
                        <div className="text-slate-400 text-sm">
                            © {currentYear} UIT University. All rights reserved.
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center space-x-4">
                            <span className="text-slate-400 text-sm mr-2">Follow us:</span>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center space-x-4 text-sm">
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-primary transition-colors">
                                Accessibility
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}