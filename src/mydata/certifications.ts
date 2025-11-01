import aceImage from "../assets/icons/certifications/googlecloud-ace.png";

interface Certification {
  name: string;
  organization: string;
  date: string;
  imageUrl: string;
  category: string;
  credentialUrl?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Assosiate Cloud Engineer",
    organization: "Google Cloud",
    date: "2025年10月",
    imageUrl: aceImage,
    category: "IT",
  },
];
