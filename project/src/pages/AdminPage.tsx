import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, X, Edit2 } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const ADMIN_EMAIL = 'karetimacharia@gmail.com';
const ADMIN_PASSWORD = 'Tolietokanki3';

export const AdminPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    details: [''],
    currentPrice: '',
    previousPrice: '',
    images: [''],
    category: '',
    externalLink: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const addImageField = (target: 'new' | 'edit') => {
    if (target === 'new') {
      setNewProduct({
        ...newProduct,
        images: [...newProduct.images, ''],
      });
    } else if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        images: [...editingProduct.images, ''],
      });
    }
  };

  const removeImageField = (index: number, target: 'new' | 'edit') => {
    if (target === 'new') {
      setNewProduct({
        ...newProduct,
        images: newProduct.images.filter((_, i) => i !== index),
      });
    } else if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        images: editingProduct.images.filter((_, i) => i !== index),
      });
    }
  };

  const updateImageField = (index: number, value: string, target: 'new' | 'edit') => {
    if (target === 'new') {
      const updatedImages = [...newProduct.images];
      updatedImages[index] = value;
      setNewProduct({
        ...newProduct,
        images: updatedImages,
      });
    } else if (editingProduct) {
      const updatedImages = [...editingProduct.images];
      updatedImages[index] = value;
      setEditingProduct({
        ...editingProduct,
        images: updatedImages,
      });
    }
  };

  const addDetailField = (target: 'new' | 'edit') => {
    if (target === 'new') {
      setNewProduct({
        ...newProduct,
        details: [...newProduct.details, ''],
      });
    } else if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        details: [...editingProduct.details, ''],
      });
    }
  };

  const removeDetailField = (index: number, target: 'new' | 'edit') => {
    if (target === 'new') {
      setNewProduct({
        ...newProduct,
        details: newProduct.details.filter((_, i) => i !== index),
      });
    } else if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        details: editingProduct.details.filter((_, i) => i !== index),
      });
    }
  };

  const updateDetailField = (index: number, value: string, target: 'new' | 'edit') => {
    if (target === 'new') {
      const updatedDetails = [...newProduct.details];
      updatedDetails[index] = value;
      setNewProduct({
        ...newProduct,
        details: updatedDetails,
      });
    } else if (editingProduct) {
      const updatedDetails = [...editingProduct.details];
      updatedDetails[index] = value;
      setEditingProduct({
        ...editingProduct,
        details: updatedDetails,
      });
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      details: newProduct.details.filter(detail => detail.trim() !== ''),
      currentPrice: parseFloat(newProduct.currentPrice),
      previousPrice: newProduct.previousPrice ? parseFloat(newProduct.previousPrice) : undefined,
      images: newProduct.images.filter(image => image.trim() !== ''),
      category: newProduct.category,
      externalLink: newProduct.externalLink,
      createdAt: new Date(),
    };

    addProduct(product);
    setNewProduct({
      name: '',
      description: '',
      details: [''],
      currentPrice: '',
      previousPrice: '',
      images: [''],
      category: '',
      externalLink: '',
    });
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 pb-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editingProduct ? editingProduct.name : newProduct.name}
                  onChange={(e) => editingProduct 
                    ? setEditingProduct({ ...editingProduct, name: e.target.value })
                    : setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={editingProduct ? editingProduct.category : newProduct.category}
                  onChange={(e) => editingProduct
                    ? setEditingProduct({ ...editingProduct, category: e.target.value })
                    : setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={editingProduct ? editingProduct.description : newProduct.description}
                onChange={(e) => editingProduct
                  ? setEditingProduct({ ...editingProduct, description: e.target.value })
                  : setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                rows={3}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-700">Product Details</label>
                <button
                  type="button"
                  onClick={() => addDetailField(editingProduct ? 'edit' : 'new')}
                  className="text-green-600 hover:text-green-700"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="space-y-2">
                {(editingProduct ? editingProduct.details : newProduct.details).map((detail, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => updateDetailField(index, e.target.value, editingProduct ? 'edit' : 'new')}
                      placeholder="Enter product detail"
                      className="flex-1 p-2 border rounded-lg"
                    />
                    {(editingProduct ? editingProduct.details : newProduct.details).length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDetailField(index, editingProduct ? 'edit' : 'new')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Current Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct ? editingProduct.currentPrice : newProduct.currentPrice}
                  onChange={(e) => editingProduct
                    ? setEditingProduct({ ...editingProduct, currentPrice: parseFloat(e.target.value) })
                    : setNewProduct({ ...newProduct, currentPrice: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Previous Price (Optional)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct ? editingProduct.previousPrice || '' : newProduct.previousPrice}
                  onChange={(e) => {
                    const value = e.target.value ? parseFloat(e.target.value) : undefined;
                    editingProduct
                      ? setEditingProduct({ ...editingProduct, previousPrice: value })
                      : setNewProduct({ ...newProduct, previousPrice: e.target.value });
                  }}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-700">Product Images</label>
                <button
                  type="button"
                  onClick={() => addImageField(editingProduct ? 'edit' : 'new')}
                  className="text-green-600 hover:text-green-700"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="space-y-2">
                {(editingProduct ? editingProduct.images : newProduct.images).map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => updateImageField(index, e.target.value, editingProduct ? 'edit' : 'new')}
                      placeholder="Enter image URL"
                      className="flex-1 p-2 border rounded-lg"
                    />
                    {(editingProduct ? editingProduct.images : newProduct.images).length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index, editingProduct ? 'edit' : 'new')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">External Link</label>
              <input
                type="url"
                value={editingProduct ? editingProduct.externalLink : newProduct.externalLink}
                onChange={(e) => editingProduct
                  ? setEditingProduct({ ...editingProduct, externalLink: e.target.value })
                  : setNewProduct({ ...newProduct, externalLink: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600">${product.currentPrice}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => startEditing(product)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};