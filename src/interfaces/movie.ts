export interface IMovie {
    _id: string;
    name: string;
    year: number;
    image: string;
    user: string; // <--- this should be updated to reflect the user type
  }