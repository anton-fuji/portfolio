import aceImage from "../assets/icons/certifications/googlecloud-ace.png";
import cdlImage from "../assets/icons/certifications/googlecloud-cdl.png";
import pcdImage from "../assets/icons/certifications/googlecloud-pcd.png";
import pcaImage from "../assets/icons/certifications/googlecloud-pca.png";
import doImage from "../assets/icons/certifications/googlecloud-devops.png";
import daImage from "../assets/icons/certifications/googlecloud-data.png";

interface Certification {
  name: string;
  organization: string;
  date: string;
  imageUrl?: string;
  category: string;
  credentialUrl?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: "基本情報技術者試験",
    organization: "IPA",
    date: "Dec 2024",
    category: "IPA",
  },
  {
    name: "Cloud Digital Leader",
    organization: "Google Cloud",
    date: "Nov 2025",
    imageUrl: cdlImage,
    category: "Google Cloud",
  },
  {
    name: "Associate Cloud Engineer",
    organization: "Google Cloud",
    date: "Oct 2025",
    imageUrl: aceImage,
    category: "Google Cloud",
  },
  {
    name: "Professional Cloud Developer",
    organization: "Google Cloud",
    date: "Dec 2025",
    imageUrl: pcdImage,
    category: "Google Cloud",
  },
  {
    name: "Professional Cloud Architect",
    organization: "Google Cloud",
    date: "Jan 2026",
    imageUrl: pcaImage,
    category: "Google Cloud",
  },
  {
    name: "Professional DevOps Engineer",
    organization: "Google Cloud",
    date: "Apr 2026",
    imageUrl: doImage,
    category: "Google Cloud",
  },
  {
    name: "Professional Data Engineer",
    organization: "Google Cloud",
    date: "Jul 2026",
    imageUrl: daImage,
    category: "Google Cloud",
  },
];
