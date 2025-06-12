export interface CartItem {
    id: string;
    tag: string;
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onRemoveItem: (itemId: string) => void;
    onProceedToCheckout: () => void;
  }