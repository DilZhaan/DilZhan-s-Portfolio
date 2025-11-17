# Adding Your Certifications

## How to Add Your LinkedIn Certifications

Since LinkedIn doesn't provide a public API for certifications, you'll need to manually add them to the JSON file.

### Step 1: Edit the certifications-full.json file

Open `/src/data/certifications-full.json` and update it with your actual certifications.

### Step 2: Get Your Certification Information from LinkedIn

1. Go to your LinkedIn profile: https://www.linkedin.com/in/dilzhan-fonseka/details/certifications/
2. For each certification, gather:
   - Certification name
   - Issuing organization
   - Issue date
   - Expiration date (if applicable)
   - Credential ID
   - Credential URL (if available)

### Step 3: Find Certification Logos

Most certification logos can be found on:
- **Credly**: https://www.credly.com/ (for AWS, Microsoft, Google Cloud, etc.)
- **Official websites**: Search for "{certification name} badge" or "{organization} certification logo"

Right-click on the logo and copy the image URL.

### Step 4: Update the JSON File

```json
{
  "linkedInProfile": "dilzhan-fonseka",
  "title": "Certifications",
  "description": "Professional certifications and credentials",
  "certifications": [
    {
      "id": 1,
      "name": "Your Certification Name",
      "issuer": "Issuing Organization",
      "issueDate": "2024-01",
      "expiryDate": "2027-01",
      "credentialId": "YOUR_CREDENTIAL_ID",
      "credentialUrl": "https://verify.example.com/your-cert",
      "logo": "https://images.credly.com/size/340x340/images/your-logo.png"
    }
  ]
}
```

### Common Certification Logo URLs

**AWS:**
- Solutions Architect Associate: `https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png`
- Developer Associate: `https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png`
- Cloud Practitioner: `https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png`

**Microsoft:**
- Azure Fundamentals: `https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png`
- Azure Administrator: `https://images.credly.com/size/340x340/images/336eebfc-0ac3-4553-9a67-b402f491f185/image.png`

**Google Cloud:**
- Associate Cloud Engineer: `https://images.credly.com/size/340x340/images/08096465-cbfc-4c3e-93e5-93c5aa61f23e/image.png`

### Example with Multiple Certifications

```json
{
  "linkedInProfile": "dilzhan-fonseka",
  "title": "Certifications",
  "description": "Professional certifications and credentials",
  "certifications": [
    {
      "id": 1,
      "name": "AWS Certified Solutions Architect - Associate",
      "issuer": "Amazon Web Services (AWS)",
      "issueDate": "2024-01",
      "expiryDate": "2027-01",
      "credentialId": "ABC123XYZ",
      "credentialUrl": "https://www.credly.com/badges/your-badge-id",
      "logo": "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
    },
    {
      "id": 2,
      "name": "Microsoft Certified: Azure Fundamentals",
      "issuer": "Microsoft",
      "issueDate": "2023-11",
      "expiryDate": null,
      "credentialId": "DEF456GHI",
      "credentialUrl": "https://learn.microsoft.com/api/credentials/share/en-us/YourName/ABC123",
      "logo": "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png"
    },
    {
      "id": 3,
      "name": "Google Cloud Certified - Associate Cloud Engineer",
      "issuer": "Google Cloud",
      "issueDate": "2023-08",
      "expiryDate": "2025-08",
      "credentialId": "JKL789MNO",
      "credentialUrl": "https://www.credential.net/your-credential",
      "logo": "https://images.credly.com/size/340x340/images/08096465-cbfc-4c3e-93e5-93c5aa61f23e/image.png"
    }
  ]
}
```

### Date Format

Use `YYYY-MM` format for dates:
- `"2024-01"` for January 2024
- `"2023-11"` for November 2023
- `null` if there's no expiration date

### Optional Fields

All fields are optional except:
- `id` (required - must be unique)
- `name` (required)
- `issuer` (required)

You can omit:
- `expiryDate` (set to `null` if no expiration)
- `credentialId`
- `credentialUrl`
- `logo`

### Features

The certifications section includes:
- 📱 Responsive 3-column grid (1 on mobile, 2 on tablet, 3 on desktop)
- 🔄 Show More/Less pagination (shows 6 initially)
- 🔗 Direct links to view credentials
- 🎨 Certification logos from Credly or official sources
- 📅 Formatted issue and expiry dates
- 🔗 LinkedIn profile link at the bottom

### Testing

After updating the JSON file, save it and refresh your portfolio. The certifications should appear in the new section.
