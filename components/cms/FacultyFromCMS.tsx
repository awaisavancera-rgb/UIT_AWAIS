'use client'

import { useFaculty } from '@/hooks/useCMS'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity'
import { Skeleton } from '@/components/ui/skeleton'
import { Mail, Phone, MapPin, GraduationCap, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function FacultyFromCMS() {
  const { faculty, loading, error } = useFaculty()

  // Helper function to safely build image URLs
  const buildImageUrl = (image: any, width?: number, height?: number) => {
    const builder = urlFor(image);
    // Check if the builder has the width method (full Sanity client)
    if (typeof (builder as any).width === 'function') {
      return width && height
        ? (builder as any).width(width).height(height).url()
        : builder.url();
    }
    // Fallback for when Sanity is not configured
    return builder.url();
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-background text-center">
            <Skeleton className="w-full h-64" />
            <CardContent className="p-6">
              <Skeleton className="h-6 w-32 mx-auto mb-2" />
              <Skeleton className="h-4 w-40 mx-auto mb-4" />
              <Skeleton className="h-9 w-24 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 mb-4">Unable to load faculty information</p>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  if (!faculty || faculty.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-muted/50 rounded-lg p-8 max-w-md mx-auto">
          <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No faculty members found</p>
          <p className="text-sm text-muted-foreground">
            Add faculty profiles to your Sanity CMS to see them here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {faculty.map((member) => (
        <Card key={member._id} className="bg-background text-center group hover:shadow-lg transition-shadow">
          <div className="overflow-hidden">
            {member.image ? (
              <img
                src={buildImageUrl(member.image, 400, 300)}
                alt={member.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-64 bg-muted flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
          </div>

          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-foreground">{member.name}</h3>

            {member.title && (
              <p className="text-primary font-medium mb-1">{member.title}</p>
            )}

            {member.department && (
              <p className="text-muted-foreground mb-4 text-sm">{member.department}</p>
            )}

            {/* Contact Information */}
            <div className="space-y-2 mb-4 text-xs text-muted-foreground">
              {member.email && (
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{member.email}</span>
                </div>
              )}

              {member.office && (
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-3 h-3" />
                  <span>{member.office}</span>
                </div>
              )}
            </div>

            {/* Specializations */}
            {member.specializations && member.specializations.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.specializations.slice(0, 2).map((spec, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                  {member.specializations.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{member.specializations.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Experience */}
            {member.experience && (
              <div className="flex items-center justify-center space-x-2 mb-4 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>{member.experience} years experience</span>
              </div>
            )}

            <Button size="sm" variant="outline" className="w-full">
              View Profile
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}