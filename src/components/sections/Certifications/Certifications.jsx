import React, { useState, useEffect } from 'react';
import certificationsData from '../../../data/certifications-full.json';

const CertificationCard = ({ cert, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="relative flex gap-6 pb-8 last:pb-0">
      {/* Timeline */}
      <div className="relative flex flex-col items-center pt-1">
        {/* Dot */}
        <div className="w-3 h-3 rounded-full border-2 bg-gray-800 border-gray-700 z-10 flex-shrink-0"></div>
        
        {/* Vertical Line */}
        {!isLast && (
          <div className="w-0.5 h-full bg-gray-900 mt-2"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Collapsed View */}
        <div 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start gap-4">
            {/* Logo */}
            {cert.logo && (
              <div className="w-12 h-12 flex-shrink-0">
                <img
                  src={cert.logo}
                  alt={cert.issuer}
                  className="w-full h-full object-contain rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              {/* Line 1: Certification name */}
              <h3 className="text-lg font-semibold text-white mb-1">
                {cert.name}
              </h3>
              
              {/* Line 2: Issuer and date */}
              <p className="text-sm text-gray-400">
                {cert.issuer}
                {cert.issueDate && (
                  <span className="text-gray-600"> · Issued {formatDate(cert.issueDate)}</span>
                )}
              </p>
            </div>
            
            {/* Expand Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="mt-4 ml-16">
            {/* Expiry Date */}
            {cert.expiryDate && (
              <p className="text-sm text-gray-400 mb-2">
                Expires: {formatDate(cert.expiryDate)}
              </p>
            )}

            {/* Credential ID */}
            {cert.credentialId && (
              <p className="text-sm text-gray-400 mb-3 break-all">
                Credential ID: {cert.credentialId}
              </p>
            )}

            {/* View Credential Button */}
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Credential →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const { title, linkedInProfile } = certificationsData;

  useEffect(() => {
    // Load certifications from JSON file
    if (certificationsData.certifications) {
      setCertifications(certificationsData.certifications);
    }
    setLoading(false);
  }, []);

  const displayedCertifications = showAll ? certifications : certifications.slice(0, 3);

  if (loading) {
    return (
      <section id="certifications" className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            {title}
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!certifications || certifications.length === 0) {
    return (
      <section id="certifications" className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            {title}
          </h2>
          <div className="text-center py-8">
            <p className="text-gray-400">No certifications available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          {title}
        </h2>

        <div>
          {displayedCertifications.map((cert, index) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              isLast={index === displayedCertifications.length - 1}
            />
          ))}
        </div>

        {/* Show More/Less Button */}
        {certifications.length > 3 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <span>{showAll ? 'Show Less' : `Show All (${certifications.length})`}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform ${showAll ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* LinkedIn Link */}
        {linkedInProfile && (
          <div className="mt-6 text-center">
            <a
              href={`https://www.linkedin.com/in/${linkedInProfile}/details/certifications/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors inline-flex items-center gap-1"
            >
              <span>View all certifications on LinkedIn</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
