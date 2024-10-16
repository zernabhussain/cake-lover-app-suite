export type CakeBase = {
  comment: string;
  imageUrl: string;
  name: string;
  yumFactor: number;
};

export type Cake = CakeBase & {
  _id: string;
};
