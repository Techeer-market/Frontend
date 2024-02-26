export interface ResChatMessage {
  map(arg0: (item: any) => JSX.Element): import("react").ReactNode;
  id: number;
  productId: number;
  productTitle: string;
  productLocation: string;
  productPrice: number;
  productThumbnail: string;
  chatPartnerName: string;
}

export type ChatProduct = {
  id: number;
  productId: number;
  productTitle: string;
  productLocation: string;
  productPrice: number;
  productThumbnail: string;
  chatPartnerName: string;
};
