import React from 'react';
import { Card, Button, TextField, Badge, ButtonGroup } from '@shopify/polaris';

interface ShoppingCartProps {
  cartItems: any[];
  updateCartItem: (productId: string, variantId: string, quantity: number) => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems, updateCartItem }) => {
  const subtotal = cartItems.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">🛒</span>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Add some items from our collection to get started
          </p>
          <Button variant="primary" url="/">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{cartItems.length} items in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <Card key={index}>
              <div className="p-6">
                <div className="flex space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {item.product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Size: {item.variant.size} | Color: {item.variant.color}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-3">
                        <TextField
                          type="number"
                          value={item.quantity.toString()}
                          onChange={(value) => 
                            updateCartItem(item.product.id, item.variant.id, parseInt(value) || 1)
                          }
                          min="1"
                          label=""
                          autoComplete="off"
                          className="w-20"
                        />
                        <Button
                          variant="secondary"
                          size="slim"
                          onClick={() => updateCartItem(item.product.id, item.variant.id, 0)}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          ${(item.variant.price * item.quantity).toFixed(2)}
                        </p>
                        {item.variant.compareAtPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            ${(item.variant.compareAtPrice * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <Badge status="success">FREE</Badge>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {shipping > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}
              
              <ButtonGroup>
                <Button variant="primary" fullWidth size="large">
                  Checkout
                </Button>
                <Button variant="secondary" fullWidth url="/">
                  Continue Shopping
                </Button>
              </ButtonGroup>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};