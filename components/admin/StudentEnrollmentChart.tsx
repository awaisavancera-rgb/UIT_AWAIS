'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { Icon } from '@iconify/react'

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const StudentEnrollmentChart = () => {
  const chartOptions = {
    chart: {
      type: 'area' as const,
      height: 350,
      toolbar: {
        show: false
      }
    },
    colors: ['#667eea', '#764ba2', '#f093fb'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth' as const,
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: {
        text: 'Number of Students'
      }
    },
    legend: {
      position: 'top' as const
    },
    grid: {
      borderColor: '#e7e7e7',
      strokeDashArray: 5
    }
  }

  const chartSeries = [
    {
      name: 'New Enrollments',
      data: [120, 145, 167, 189, 203, 178, 234, 267, 289, 312, 298, 345]
    },
    {
      name: 'Active Students',
      data: [2100, 2245, 2412, 2601, 2804, 2982, 3216, 3483, 3772, 4084, 4382, 4727]
    },
    {
      name: 'Graduates',
      data: [45, 52, 38, 67, 89, 123, 98, 145, 167, 134, 178, 234]
    }
  ]

  return (
    <div className="card h-100">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
        <h6 className="text-lg fw-semibold mb-0">Student Enrollment Trends</h6>
        <div className="dropdown">
          <button 
            className="btn btn-sm btn-outline-primary dropdown-toggle" 
            type="button" 
            data-bs-toggle="dropdown"
          >
            <Icon icon="solar:calendar-bold" className="me-1" />
            This Year
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">This Month</a></li>
            <li><a className="dropdown-item" href="#">This Year</a></li>
            <li><a className="dropdown-item" href="#">Last Year</a></li>
          </ul>
        </div>
      </div>
      <div className="card-body p-24">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={350}
        />
      </div>
    </div>
  )
}

export default StudentEnrollmentChart