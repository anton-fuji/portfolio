import aceImage from "../assets/icons/certifications/googlecloud-ace.png";
import cdlImage from "../assets/icons/certifications/googlecloud-cdl.png";
import pcdImage from "../assets/icons/certifications/googlecloud-pcd.png";
import pcaImage from "../assets/icons/certifications/googlecloud-pca.png";
import doImage from "../assets/icons/certifications/googlecloud-devops.png";
import daImage from "../assets/icons/certifications/googlecloud-data.png";
import type { LocalizedText } from "../i18n";

interface Certification {
  name: LocalizedText;
  organization: string;
  date: string;
  imageUrl?: string;
  category: string;
  credentialUrl?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: {
      ja: "基本情報技術者試験",
      en: "Fundamental Information Technology Engineer Examination",
    },
    organization: "IPA",
    date: "2024-12",
    category: "IPA",
  },
  {
    name: "Cloud Digital Leader",
    organization: "Google Cloud",
    date: "2025-11",
    imageUrl: cdlImage,
    category: "Google Cloud",
  },
  {
    name: "Associate Cloud Engineer",
    organization: "Google Cloud",
    date: "2025-10",
    imageUrl: aceImage,
    category: "Google Cloud",
  },
  {
    name: "Professional Cloud Developer",
    organization: "Google Cloud",
    date: "2025-12",
    imageUrl: pcdImage,
    category: "Google Cloud",
  },
  {
    name: "Professional Cloud Architect",
    organization: "Google Cloud",
    date: "2026-01",
    imageUrl: pcaImage,
    category: "Google Cloud",
  },
  {
    name: "Professional DevOps Engineer",
    organization: "Google Cloud",
    date: "2026-04",
    imageUrl: doImage,
    category: "Google Cloud",
  },
  {
    name: "Professional Data Engineer",
    organization: "Google Cloud",
    date: "2026-07",
    imageUrl: daImage,
    category: "Google Cloud",
  },
];
