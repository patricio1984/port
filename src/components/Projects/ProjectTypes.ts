export interface IProject {
  id: number;
  link: string;
  image: string;
  imageLight?: string;
  alt: string;
  title: string;
  description: string;
  year: string;
  tech: string[];
  decisions: string[];
}
