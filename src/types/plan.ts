export interface Project {
  num: string;
  type: string;
  title: string;
  description: string;
  stack: string;
  price: string;
  connect: string;
}

export interface Bibliography {
  resource: string;
  author: string;
  lang: string;
  area: string;
}

export interface Semester {
  id: string;
  number: string;
  title: string;
  meta: string;
  bloqueA: {
    title: string;
    items: string[];
  };
  bloqueB: {
    title: string;
    items: string[];
  };
  bibliography: Bibliography[];
  projects: Project[];
}

export interface Phase {
  number: string;
  title: string;
  description: string;
  semesters: string;
}

export interface PlanData {
  phases: Phase[];
  semesters: Semester[];
}
