import React, { useState, useEffect } from 'react';
import certificationsData from '../../../data/certifications-full.json';

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

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

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

        <div className="space-y-4">
          {displayedCertifications.map((cert) => (
            <div
              key={cert.id}
              className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Issuer Logo */}
                  {cert.logo && (
                    <div className="w-12 h-12 flex-shrink-0">
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    {/* Certification Name */}
                    <h3 className="text-lg font-semibold text-white mb-1 break-words">
                      {cert.name}
                    </h3>

                    {/* Issuer */}
                    <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>

                    {/* Issue Date */}
                    <div className="text-gray-500 text-sm mb-2">
                      Issued: {formatDate(cert.issueDate)}
                      {cert.expiryDate && (
                        <span className="ml-2">
                          • Expires: {formatDate(cert.expiryDate)}
                        </span>
                      )}
                    </div>

                    {/* Credential ID */}
                    {cert.credentialId && (
                      <div className="text-gray-500 text-sm mb-3 truncate">
                        Credential ID: {cert.credentialId}
                      </div>
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
                </div>
              </div>
            </div>
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
