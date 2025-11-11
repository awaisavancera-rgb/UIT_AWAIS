'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigationItems = [
        { name: 'Home', href: '/' },
        {
            name: 'About',
            href: '/about',
            dropdown: [
                { name: 'About UIT', href: '/about' },
                { name: 'Our Mission', href: '/about#mission' },
                { name: 'Leadership', href: '/about#leadership' },
                { name: 'Campus', href: '/about#campus' }
            ]
        },
        {
            name: 'Academics',
            href: '/courses',
            dropdown: [
                { name: 'All Programs', href: '/courses' },
                { name: 'Engineering', href: '/courses?category=engineering' },
                { name: 'Computer Science', href: '/courses?category=computer-science' },
                { name: 'Business', href: '/courses?category=business' },
                { name: 'Management', href: '/courses?category=management' }
            ]
        },
        { name: 'MERL', href: '/merl' },
        { name: 'Faculty', href: '/faculty' },
        {
            name: 'Admissions',
            href: '/admissions',
            dropdown: [
                { name: 'How to Apply', href: '/admissions' },
                { name: 'Requirements', href: '/admissions#requirements' },
                { name: 'Scholarships', href: '/admissions#scholarships' },
                { name: 'International Students', href: '/admissions#international' }
            ]
        },
        { name: 'Contact', href: '/contact' },
    { name: 'Chat Assistant', href: '/chat' }
    ];

    const toggleDropdown = (itemName: string) => {
        setActiveDropdown(activeDropdown === itemName ? null : itemName);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Top Bar */}
            <div className="bg-primary text-primary-foreground py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4 text-sm">
                            <div className="hidden sm:flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>+92-21-111-978-275</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span className="hidden sm:inline">info@uitu.edu.pk</span>
                                <span className="sm:hidden">Contact Us</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10">
                                <Facebook className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10">
                                <Twitter className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10">
                                <Instagram className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10">
                                <Linkedin className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className={`transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-border/50'
                : 'bg-white/90 backdrop-blur-sm'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 lg:h-20">

                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center group">
                                <div className="flex items-center">
                                    {/* UIT Logo Image */}
                                    <div className="h-12 w-auto lg:h-14 lg:w-auto group-hover:opacity-90 transition-opacity">
                                        <img
                                            src="/images/logo_with_text_final__6_-removebg-preview (2).png"
                                            alt="UIT University Logo"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>

                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-1">
                            {navigationItems.map((item) => (
                                <div key={item.name} className="relative group">
                                    {item.dropdown ? (
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleDropdown(item.name)}
                                                className="flex items-center text-foreground hover:text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors group"
                                            >
                                                {item.name}
                                                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''
                                                    }`} />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {activeDropdown === item.name && (
                                                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-border py-2 z-50">
                                                    {item.dropdown.map((dropdownItem) => (
                                                        <Link
                                                            key={dropdownItem.name}
                                                            href={dropdownItem.href}
                                                            className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            {dropdownItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-foreground hover:text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* CTA Buttons */}
                        <div className="hidden lg:flex items-center space-x-3">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/cms-demo">CMS Demo</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/apply">Apply Now</Link>
                            </Button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="lg:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-foreground hover:text-primary"
                            >
                                {isMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-border">
                    <div className="px-4 py-3 space-y-1">
                        {navigationItems.map((item) => (
                            <div key={item.name}>
                                {item.dropdown ? (
                                    <div>
                                        <button
                                            onClick={() => toggleDropdown(item.name)}
                                            className="flex items-center justify-between w-full text-left text-foreground hover:text-primary px-3 py-2 rounded-lg text-base font-medium transition-colors"
                                        >
                                            {item.name}
                                            <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''
                                                }`} />
                                        </button>

                                        {activeDropdown === item.name && (
                                            <div className="ml-4 mt-1 space-y-1">
                                                {item.dropdown.map((dropdownItem) => (
                                                    <Link
                                                        key={dropdownItem.name}
                                                        href={dropdownItem.href}
                                                        className="block text-muted-foreground hover:text-primary px-3 py-2 rounded-lg text-sm transition-colors"
                                                        onClick={() => {
                                                            setIsMenuOpen(false);
                                                            setActiveDropdown(null);
                                                        }}
                                                    >
                                                        {dropdownItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="block text-foreground hover:text-primary px-3 py-2 rounded-lg text-base font-medium transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Mobile CTA Buttons */}
                        <div className="pt-4 space-y-2">
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/cms-demo" onClick={() => setIsMenuOpen(false)}>
                                    CMS Demo
                                </Link>
                            </Button>
                            <Button className="w-full" asChild>
                                <Link href="/apply" onClick={() => setIsMenuOpen(false)}>
                                    Apply Now
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay for mobile dropdown */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden -z-10"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </header>
    );
}