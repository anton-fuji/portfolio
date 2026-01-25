import aceImage from "../assets/icons/certifications/googlecloud-ace.png";
import cdlImage from "../assets/icons/certifications/googlecloud-cdl.png";
import pcdImage from "../assets/icons/certifications/googlecloud-pcd.png";
import pcaImage from "../assets/icons/certifications/googlecloud-pca.png";

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
    name: "Cloud Digital Leader",
    organization: "Google Cloud",
    date: "2025年11月",
    imageUrl: cdlImage,
    category: "IT",
  },
  {
    name: "Assosiate Cloud Engineer",
    organization: "Google Cloud",
    date: "2025年10月",
    imageUrl: aceImage,
    category: "IT",
  },
  {
    name: "Professional Cloud Developer",
    organization: "Google Cloud",
    date: "2025年12月",
    imageUrl: pcdImage,
    category: "IT",
  },
  {
    name: "Professional Cloud Architect",
    organization: "Google Cloud",
    date: "2026年 1月",
    imageUrl: pcaImage,
    category: "IT",
  },
];
