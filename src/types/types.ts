export interface LayoutProps {
  children: React.ReactNode;
}

export interface IconProps {
  className?: string;
}

export interface ErrorProps {
  error: Error;
  reset: () => void;
}

export interface jobInfoProps {
  _id: string;
  userId: string;
  organizationType: string;
  companyName: string;
  jobTitle: string;
  vacancy: string;
  employmentType: string;
  salary: number;
  education: string;
  location: string;
  jobContext: string;
  category: string;
  jobResponsibilities: string;
  jobBenefit: string;
  applyEmail: string;
  deadline: Date;
  createdAt: Date;
  createdPost: {
    companyName: string;
    image_url: string;
  };
}

export interface PaginationProps {
  totalPage: number;
  totalDocuments: number;
  lastPage: number;
}
