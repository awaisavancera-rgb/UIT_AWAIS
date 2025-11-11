import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './admin.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="admin-wrapper">
          {children}
        </div>
      </body>
    </html>
  )
}