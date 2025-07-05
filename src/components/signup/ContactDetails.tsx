'use client';

interface ContactDetailsProps {
  formData: {
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  errors: {
    location?: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export default function ContactDetails({
  formData,
  errors,
  onInputChange
}: ContactDetailsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Details</h2>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={(e) => onInputChange('location', e.target.value)}
          placeholder="City, State, Country"
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
            errors.location ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location}</p>
        )}
      </div>

      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
          LinkedIn Profile (Optional)
        </label>
        <input
          type="url"
          id="linkedin"
          value={formData.linkedin}
          onChange={(e) => onInputChange('linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="github" className="block text-sm font-medium text-gray-700">
          GitHub Profile (Optional)
        </label>
        <input
          type="url"
          id="github"
          value={formData.github}
          onChange={(e) => onInputChange('github', e.target.value)}
          placeholder="https://github.com/yourusername"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
          Portfolio Website (Optional)
        </label>
        <input
          type="url"
          id="portfolio"
          value={formData.portfolio}
          onChange={(e) => onInputChange('portfolio', e.target.value)}
          placeholder="https://yourportfolio.com"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
} 