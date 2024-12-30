import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export interface homeDataType {
  logoUrl: string;
  title: string;
  subTitle: string;
  linkdinUrl: string;
  githubUrl: string;
  youtubeUrl: string;
  telegramUrl: string;
  xUrl: string;
  contactText: string;
  footerText: string;
  phoneNumber: string;
  phoneNumber2: string;
  email: string;
  skills: {
    title: string;
    id: number;
    Icon: string;
  }[];
  aboutText: string;
  projects: {
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    videoUrl: string;
  }[];
  experiences: {
    title: string;
    location: string;
    description: string;
    icon: string;
    date: string;
  }[];
  form: {
    enabelName: boolean;
    enabelEmail: boolean;
    enabelPhoneNumber: boolean;
    enabelCountry: boolean;
    enabelProvince: boolean;
    enabelCity: boolean;
    enabelCommunicationWay: boolean;
    enabelProjectCategory: boolean;
    enabelTitleRequest: boolean;
    enabelAdditionalDescription: boolean;
    enabelUpload: boolean;
    communicationWayData: {
      id: number;
      title: string;
    }[];
    projectCategory: {
      id: number;
      title: string;
    }[];
  };
}
