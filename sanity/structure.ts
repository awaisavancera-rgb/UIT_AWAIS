import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content Management')
    .items([
      // Dashboard Overview
      S.listItem()
        .title('📊 Dashboard Overview')
        .child(
          S.list()
            .title('Content Statistics')
            .items([
              S.documentTypeListItem('course').title('📚 All Courses'),
              S.documentTypeListItem('faculty').title('👨‍🏫 All Faculty'),
              S.documentTypeListItem('event').title('📅 All Events'),
              S.documentTypeListItem('blogPost').title('📝 All Blog Posts'),
            ])
        ),

      S.divider(),

      // Courses
      S.listItem()
        .title('Courses')
        .child(
          S.list()
            .title('Course Management')
            .items([
              S.listItem()
                .title('All Courses')
                .child(S.documentTypeList('course')),
              S.listItem()
                .title('Featured')
                .child(
                  S.documentTypeList('course')
                    .title('Featured Courses')
                    .filter('_type == "course" && featured == true')
                ),
              S.listItem()
                .title('By Level')
                .child(
                  S.list()
                    .title('Courses by Level')
                    .items([
                      S.listItem()
                        .title('Beginner')
                        .child(
                          S.documentTypeList('course')
                            .title('Beginner Courses')
                            .filter('_type == "course" && level == "beginner"')
                        ),
                      S.listItem()
                        .title('Intermediate')
                        .child(
                          S.documentTypeList('course')
                            .title('Intermediate Courses')
                            .filter('_type == "course" && level == "intermediate"')
                        ),
                      S.listItem()
                        .title('Advanced')
                        .child(
                          S.documentTypeList('course')
                            .title('Advanced Courses')
                            .filter('_type == "course" && level == "advanced"')
                        ),
                    ])
                ),
              S.listItem()
                .title('Course Details')
                .child(S.documentTypeList('courseDetails')),
            ])
        ),

      // Faculty
      S.listItem()
        .title('Faculty')
        .child(
          S.list()
            .title('Faculty Management')
            .items([
              S.listItem()
                .title('All Faculty')
                .child(S.documentTypeList('faculty')),
              S.listItem()
                .title('Featured')
                .child(
                  S.documentTypeList('faculty')
                    .title('Featured Faculty')
                    .filter('_type == "faculty" && featured == true')
                ),
              S.listItem()
                .title('By Department')
                .child(
                  S.list()
                    .title('Faculty by Department')
                    .items([
                      S.listItem()
                        .title('Computer Science')
                        .child(
                          S.documentTypeList('faculty')
                            .title('CS Faculty')
                            .filter('_type == "faculty" && department == "computer-science"')
                        ),
                      S.listItem()
                        .title('Engineering')
                        .child(
                          S.documentTypeList('faculty')
                            .title('Engineering Faculty')
                            .filter('_type == "faculty" && department == "engineering"')
                        ),
                      S.listItem()
                        .title('Business')
                        .child(
                          S.documentTypeList('faculty')
                            .title('Business Faculty')
                            .filter('_type == "faculty" && department == "business"')
                        ),
                    ])
                ),
            ])
        ),

      // Content
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content Management')
            .items([
              S.listItem()
                .title('Blog Posts')
                .child(S.documentTypeList('blogPost')),
              S.listItem()
                .title('Events')
                .child(S.documentTypeList('event')),
              S.listItem()
                .title('Testimonials')
                .child(S.documentTypeList('testimonial')),
              S.listItem()
                .title('Timeline')
                .child(S.documentTypeList('timeline')),
            ])
        ),

      // Website
      S.listItem()
        .title('Website')
        .child(
          S.list()
            .title('Website Management')
            .items([
              S.listItem()
                .title('Hero Content')
                .child(S.documentTypeList('heroContent')),
              S.listItem()
                .title('Pages')
                .child(S.documentTypeList('page')),
              S.listItem()
                .title('Navigation')
                .child(S.documentTypeList('menu')),
            ])
        ),

      // Settings
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('General')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('SEO')
                .child(S.document().schemaType('seoSettings').documentId('seoSettings')),
              S.listItem()
                .title('Contact')
                .child(S.document().schemaType('contactSettings').documentId('contactSettings')),
            ])
        ),
    ])