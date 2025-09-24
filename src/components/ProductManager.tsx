import React, { useState } from 'react';
import { Card, Page, Layout, Button, DataTable, Modal, TextField, Select, Toast, Frame, Badge, FormLayout, Checkbox, Box, BlockStack, InlineStack } from '@shopify/polaris';
import { PlusMinor, EditMinor, DeleteMinor } from '@shopify/polaris-icons';

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: Array<{ id: string; src: string; alt: string }>;
  variants: Array<{
    id: string;
    title: string;
    price: string;
    inventory_quantity: number;
  }>;
}

export const ProductManager: React.FC = () => {
  // Mock data for standalone preview mode
  const mockProducts = [
    {
      id: '1',
      title: 'Classic White T-Shirt',
      handle: 'classic-white-tshirt',
      description: 'A comfortable cotton t-shirt perfect for everyday wear',
      images: [{ id: '1', src: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg', alt: 'White T-Shirt' }],
      variants: [{ id: '1', title: 'Default', price: '29.99', inventory_quantity: 100 }]
    },
    {
      id: '2',
      title: 'Denim Jacket',
      handle: 'denim-jacket',
      description: 'Stylish denim jacket for a casual look',
      images: [{ id: '2', src: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', alt: 'Denim Jacket' }],
      variants: [{ id: '2', title: 'Default', price: '89.99', inventory_quantity: 50 }]
    }
  ];

  const products = mockProducts;
  const loading = false;
  const error = null;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'dresses',
    aiOptimized: true,
    price: '',
  });

  const categoryOptions = [
    { label: 'All Categories', value: 'all' },
    { label: 'Dresses', value: 'dresses' },
    { label: 'Tops', value: 'tops' },
    { label: 'Pants', value: 'pants' },
    { label: 'Jackets', value: 'jackets' },
    { label: 'Accessories', value: 'accessories' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.handle.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const productRows = filteredProducts.map(product => [
    product.title,
    product.variants[0]?.price || 'N/A',
    product.variants.reduce((sum, variant) => sum + (variant.inventory_quantity || 0), 0),
    <Badge key={product.id} tone="success">AI Ready</Badge>,
    <Button
      key={`edit-${product.id}`}
      size="slim"
      onClick={() => handleEditProduct(product)}
    >
      Edit
    </Button>,
  ]);

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description || '',
      category: 'dresses', // Default category
      aiOptimized: true,
      price: product.variants[0]?.price || '',
    });
    setIsModalOpen(true);
  };

  const handleCreateProduct = async () => {
    try {
      // Mock create product for standalone mode
      console.log('Creating product:', newProduct);
      setToast({ content: 'Product created successfully!', error: false });
      setIsCreateModalOpen(false);
      setNewProduct({ title: '', description: '', price: '', inventory: '' });
    } catch (err) {
      setToast({ content: 'Failed to create product', error: true });
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;
    try {
      // Mock update product for standalone mode
      console.log('Updating product:', selectedProduct.id, editProduct);
      setToast({ content: 'Product updated successfully!', error: false });
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      setToast({ content: 'Failed to update product', error: true });
    }
  };

  const handleSaveProduct = async () => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          title: formData.title,
          description: formData.description,
        });
        setToastMessage('Product updated successfully!');
      } else {
        await createProduct({
          title: formData.title,
          description: formData.description,
        });
        setToastMessage('Product created successfully!');
      }
      
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({
        title: '',
        description: '',
        category: 'dresses',
        aiOptimized: true,
        price: '',
      });
      setShowToast(true);
    } catch (error) {
      console.error('Error saving product:', error);
      setToastMessage('Error saving product. Please try again.');
      setShowToast(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      title: '',
      description: '',
      category: 'dresses',
      aiOptimized: true,
      price: '',
    });
  };

  if (loading) {
    return (
      <Page title="Product Manager">
        <Layout>
          <Layout.Section>
            <Card>
              <Box padding="400">
                Loading products...
              </Box>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page
      title="Product Manager"
      subtitle="Manage your AI-ready fashion products"
      primaryAction={{
        content: 'Add Product',
        onAction: () => setIsModalOpen(true),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Box padding="400">
              <BlockStack gap="400">
                <InlineStack gap="400">
                  <Box minWidth="20rem">
                    <TextField
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder="Search products..."
                      autoComplete="off"
                      label=""
                    />
                  </Box>
                  <Select
                    label=""
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                  />
                </InlineStack>

                <DataTable
                  columnContentTypes={['text', 'text', 'numeric', 'text', 'text']}
                  headings={['Product', 'Price', 'Inventory', 'AI Status', 'Actions']}
                  rows={productRows}
                />
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        primaryAction={{
          content: editingProduct ? 'Update Product' : 'Create Product',
          onAction: handleSaveProduct,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleModalClose,
          },
        ]}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              value={formData.title}
              onChange={(value) => setFormData({ ...formData, title: value })}
              label="Product Title"
              autoComplete="off"
            />
            
            <TextField
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              label="Description"
              multiline={4}
              autoComplete="off"
            />
            
            <Select
              label="Category"
              options={categoryOptions.slice(1)} // Remove "All Categories"
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value })}
            />
            
            <TextField
              value={formData.price}
              onChange={(value) => setFormData({ ...formData, price: value })}
              label="Price"
              type="number"
              prefix="$"
              autoComplete="off"
            />
            
            <Checkbox
              label="Enable AI Try-On"
              checked={formData.aiOptimized}
              onChange={(checked) => setFormData({ ...formData, aiOptimized: checked })}
            />
          </FormLayout>
        </Modal.Section>
      </Modal>

      {showToast && (
        <Toast
          content={toastMessage}
          onDismiss={() => setShowToast(false)}
        />
      )}
    </Page>
  );
};