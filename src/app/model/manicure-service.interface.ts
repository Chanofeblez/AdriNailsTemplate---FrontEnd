// manicure-service.interface.ts
export interface ManicureInterface {
  name: string;
  description: string;
  cover: string;
  price: number;
  note?: string;
  extrasList?: Extra[];
}

export interface Extra {
  name: string;
  cover: string;
  price: number;
}
