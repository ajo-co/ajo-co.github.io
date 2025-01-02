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
  teamMembers: {
    fullName: string;
    title: string;
    avatar: string;
    level: string;
  }[];
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
    communicationWayData: itemWhitTitle[];
    projectCategory: itemWhitTitle[];
  };
  projectFormDetail: {
    formConfig: {
      nameConfig: fieldType;
      emailConfig: fieldType;
      phoneNumberConfig: fieldType;
      countryConfig: fieldType;
      provinceConfig: fieldType;
      cityConfig: fieldType;
      communicationWayConfig: fieldType;
      projectCategoryConfig: fieldType;
      projectPackageConfig: fieldType;
      titleRequestConfig: fieldType;
      additionalDescriptionConfig: fieldType;
      uploadConfig: fieldType;
    };
    formQuestions: {
      communicationWayData: itemWhitTitle[];
      projectCategory: { cost: number; id: number; title: string }[];
      projectPackage: itemWhitTitle & { cost: number; relatedQuestionId: number; id: number; title: string }[];
      // ["relatedQuestion1"]: [];
    };
  };
}

interface fieldType {
  type: "text";
  required: true;
  show: true;
}

interface itemWhitTitle {
  id: number;
  title: string;
}
