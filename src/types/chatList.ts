export interface ResChatMessage {
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
