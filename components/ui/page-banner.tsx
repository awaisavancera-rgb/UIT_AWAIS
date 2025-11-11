import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface PageBannerProps {
    title: string
    subtitle?: string
    breadcrumbs: BreadcrumbItem[]
    backgroundImage?: string
    className?: string
}

export default function PageBanner({
    title,
    subtitle,
    breadcrumbs,
    backgroundImage = "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    className = ""
}: PageBannerProps) {
    return (
        <section
            className={`relative h-[50vh] flex items-center justify-center ${className}`}
            style={{
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center justify-center mb-6" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 text-sm">
                        {breadcrumbs.map((item, index) => (
                            <li key={index} className="flex items-center">
                                {index > 0 && (
                                    <ChevronRight className="w-4 h-4 mx-2 text-white/70" />
                                )}
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="text-white/80 hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-white font-medium">{item.label}</span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {title}
                </h1>

                {/* Subtitle */}
                {subtitle && (
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    )
}