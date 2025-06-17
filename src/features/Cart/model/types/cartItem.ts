export interface CartItem {
  id: string;
  name: string;
  tag: string;
  price: number;
  quantity: number;
  duration: number;

  originalPrice: number;
    itemTag: string; 
      savings?: number; // optional გახადე

}

 export interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onRemoveItem: (itemId: string) => void;
    onProceedToCheckout: () => void;
  }