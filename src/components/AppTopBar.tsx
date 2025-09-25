import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TopBar, Icon, Badge } from '@shopify/polaris';
import { PersonIcon, CartIcon } from '@shopify/polaris-icons';

interface AppTopBarProps {
  cartItems: any[];
}

export const AppTopBar: React.FC<AppTopBarProps> = ({ cartItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navigation = (
    <div className="flex items-center space-x-6">
      <button
        onClick={() => navigate('/')}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          location.pathname === '/' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-700 hover:text-blue-600'
        }`}
      >
        Products
      </button>
    </div>
  );

  const secondaryMenu = [
    {
      items: [
        {
          content: 'Profile',
          onAction: () => navigate('/profile')
        },
        {
          content: 'Settings',
          onAction: () => {}
        },
        {
          content: 'Sign out',
          onAction: () => {}
        }
      ]
    }
  ];

  const userMenu = (
    <TopBar.UserMenu
      actions={secondaryMenu}
      name="Sarah Johnson"
      detail="Premium Member"
      avatar="https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
    />
  );

  return (
    <TopBar
      showNavigationToggle={false}
      userMenu={userMenu}
      secondaryMenu={
        <div className="flex items-center space-x-4">
          {navigation}
          <button
            onClick={() => navigate('/cart')}
            className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Icon source={CartIcon} />
            {cartItemCount > 0 && (
              <Badge status="info" size="small">
                {cartItemCount}
              </Badge>
            )}
          </button>
        </div>
      }
    />
  );
};