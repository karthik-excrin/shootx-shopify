import React from 'react';
import { Card, Badge, Button, Avatar } from '@shopify/polaris';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    tryOnHistory: any[];
  };
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account and view your try-on history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <div className="p-6 text-center">
            <Avatar
              size="xl"
              name={user.name}
              source="https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
            />
            <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <Badge status="success" size="small">Premium Member</Badge>
            <div className="mt-4 space-y-2">
              <Button fullWidth>Edit Profile</Button>
              <Button fullWidth variant="secondary">Settings</Button>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Try-On History</h3>
              {user.tryOnHistory.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No try-on history yet</p>
                  <Button variant="secondary" url="/try-on">
                    Start Your First Try-On
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.tryOnHistory.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex space-x-3">
                        <img
                          src={item.results.front}
                          alt="Try-on result"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.title}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(item.processedAt).toLocaleDateString()}
                          </p>
                          <Badge status="success" size="small">
                            {item.fitScore}% Fit
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};