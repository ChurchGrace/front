export interface INavigation {
  _id: string;
  title: string;
  url?: string;
  className?: string;
  submenu?: {
    title: string;
    url: string;
    _id: string;
  }[];
}
