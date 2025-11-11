'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    level: '',
    previousEducation: '',
    experience: '',
    motivation: '',
    documents: null as FileList | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      documents: e.target.files
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Application submitted:', formData);
    alert('Application submitted successfully! We will contact you soon.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="heading-large mb-4">Apply Now</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Start your journey towards academic excellence. Fill out the application form below to begin your admission process.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="heading-large text-gray-900 mb-4">Application Form</h2>
              <p className="text-lg text-gray-600">
                Please fill out all the required information accurately. Fields marked with * are mandatory.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
                      Program of Interest *
                    </label>
                    <select
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a program</option>
                      <optgroup label="Undergraduate Programs">
                        <option value="bs-cs">BS Computer Science</option>
                        <option value="bs-se">BS Software Engineering</option>
                        <option value="bs-ai">BS Artificial Intelligence</option>
                        <option value="bs-ds">BS Data Science</option>
                        <option value="be-electrical">BE Electrical Engineering</option>
                        <option value="be-computer">BE Computer Systems</option>
                        <option value="bba">BBA Business Administration</option>
                        <option value="bs-af">BS Accounting and Finance</option>
                      </optgroup>
                      <optgroup label="Graduate Programs">
                        <option value="ms-ee">MS Electrical Engineering</option>
                        <option value="ms-cne">MS Communication and Network Engineering</option>
                        <option value="ms-cs">MS Computer Science</option>
                      </optgroup>
                      <optgroup label="Short Courses">
                        <option value="python">Python Programming</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="ui-ux">UI/UX Design</option>
                        <option value="data-analysis">Data Analysis</option>
                      </optgroup>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                      Level *
                    </label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select level</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="short-course">Short Course</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="previousEducation" className="block text-sm font-medium text-gray-700 mb-2">
                      Previous Education *
                    </label>
                    <textarea
                      id="previousEducation"
                      name="previousEducation"
                      value={formData.previousEducation}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Please describe your previous educational background, including degrees, institutions, and years of study..."
                    />
                  </div>
                </div>
              </div>

              {/* Experience and Motivation */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">Experience and Motivation</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                      Relevant Experience
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe any relevant work experience, internships, or projects that relate to your chosen program..."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                      Motivation Statement *
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Please explain why you want to join this program, your career goals, and how this program will help you achieve them..."
                    />
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">Required Documents</h3>
                <div>
                  <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Documents *
                  </label>
                  <input
                    type="file"
                    id="documents"
                    name="documents"
                    onChange={handleFileChange}
                    multiple
                    required
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Please upload: Academic transcripts, CNIC copy, passport size photographs, and any other relevant documents.
                    Supported formats: PDF, DOC, DOCX, JPG, PNG
                  </p>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                    I declare that all information provided in this application is true and accurate. 
                    I understand that providing false information may result in the rejection of my application. 
                    I agree to the <Link href="/terms" className="text-blue-600 hover:text-blue-700">terms and conditions</Link> and 
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700 ml-1">privacy policy</Link>.
                  </label>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-large text-gray-900 mb-4">Application Process</h2>
            <p className="text-lg text-gray-600">
              Follow these simple steps to complete your application.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Application</h3>
              <p className="text-gray-600">
                Fill out the application form with all required information and documents.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Review</h3>
              <p className="text-gray-600">
                Our admissions team will review your application and documents.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Admission Test</h3>
              <p className="text-gray-600">
                Take the required admission test (GAT) and interview if applicable.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Admission Decision</h3>
              <p className="text-gray-600">
                Receive your admission decision and complete enrollment if accepted.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
