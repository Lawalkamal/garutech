// src/components/admin/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from './ImageUpload';
import { productService, Product, ProductFormData } from '@/services/productServices';
import { categories, getSubCategoriesByParent } from '@/data/products';
import { Plus, Minus, Save, ArrowLeft, X, ChevronDown } from 'lucide-react';

interface ProductFormProps {
  product?: Product;
  onSave: () => void;
  onCancel: () => void;
}

const mainCategories = categories.map(cat => cat.id);

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    brand: '',
    price: 0,
    originalPrice: undefined,
    description: '',
    image: '',
    imagePublicId: '',
    category: [],
    subCategory: [],
    stockCount: 0,
    specifications: {},
    features: [''],
    priority: undefined, // NEW: Add priority field
  });
  
  const [specifications, setSpecifications] = useState([{ key: '', value: '' }]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get available sub-categories based on selected main categories
  const availableSubCategories = selectedCategories.flatMap(categoryId => 
    getSubCategoriesByParent(categoryId)
  );

  useEffect(() => {
    if (product) {
      // Handle both string and array categories
      const productCategories = Array.isArray(product.category) 
        ? product.category 
        : [product.category];
        
      const productSubCategories = product.subCategory 
        ? Array.isArray(product.subCategory)
          ? product.subCategory
          : [product.subCategory]
        : [];
        
      setSelectedCategories(productCategories);
      setSelectedSubCategories(productSubCategories);
      
      setFormData({
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        description: product.description,
        image: product.image,
        imagePublicId: product.imagePublicId,
        category: product.category,
        subCategory: product.subCategory,
        stockCount: product.stockCount,
        specifications: product.specifications,
        features: product.features,
        priority: product.priority // NEW: Set priority from product
      });

      const specsArray = Object.entries(product.specifications).map(([key, value]) => ({
        key, value
      }));
      setSpecifications(specsArray.length > 0 ? specsArray : [{ key: '', value: '' }]);
    }
  }, [product]);

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId];
      
      // Remove sub-categories that belong to deselected main categories
      if (!newCategories.includes(categoryId)) {
        const subcatsToRemove = getSubCategoriesByParent(categoryId).map(sub => sub.id);
        setSelectedSubCategories(prevSub => 
          prevSub.filter(subId => !subcatsToRemove.includes(subId))
        );
      }
      
      // Update form data
      updateFormDataCategories(newCategories, selectedSubCategories);
      
      return newCategories;
    });
  };

  const handleSubCategoryToggle = (subCategoryId: string) => {
    setSelectedSubCategories(prev => {
      const newSubCategories = prev.includes(subCategoryId)
        ? prev.filter(c => c !== subCategoryId)
        : [...prev, subCategoryId];
      
      // Update form data
      updateFormDataCategories(selectedCategories, newSubCategories);
      
      return newSubCategories;
    });
  };

  const updateFormDataCategories = (categories: string[], subCategories: string[]) => {
    setFormData(prevForm => ({
      ...prevForm,
      category: categories.length === 1 ? categories[0] : categories,
      subCategory: subCategories.length === 0 ? undefined : 
                   subCategories.length === 1 ? subCategories[0] : subCategories
    }));
  };

  const removeCategory = (categoryId: string) => {
    handleCategoryToggle(categoryId);
  };

  const removeSubCategory = (subCategoryId: string) => {
    handleSubCategoryToggle(subCategoryId);
  };

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUploaded = (imageUrl: string, publicId: string) => {
    handleInputChange('image', imageUrl);
    handleInputChange('imagePublicId', publicId);
  };

  const handleImageRemoved = () => {
    handleInputChange('image', '');
    handleInputChange('imagePublicId', '');
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    }
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const addSpecification = () => {
    setSpecifications(prev => [...prev, { key: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    if (specifications.length > 1) {
      setSpecifications(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    setSpecifications(prev =>
      prev.map((spec, i) => i === index ? { ...spec, [field]: value } : spec)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert specifications array back to object
      const specsObject = specifications.reduce((obj, spec) => {
        if (spec.key.trim() && spec.value.trim()) {
          obj[spec.key.trim()] = spec.value.trim();
        }
        return obj;
      }, {} as Record<string, string>);

      // Filter out empty features
      const cleanFeatures = formData.features.filter(f => f.trim().length > 0);

      const productData: ProductFormData = {
        ...formData,
        features: cleanFeatures,
        specifications: specsObject
      };

      if (product?.id) {
        await productService.updateProduct(product.id, productData);
      } else {
        await productService.addProduct(productData);
      }

      onSave();
    } catch (error: any) {
      setError(error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">
          {product ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Brand</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Categories Section */}
              <div>
                <label className="block text-sm font-medium mb-2">Main Categories</label>
                
                {/* Selected Categories Display */}
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedCategories.map((categoryId) => {
                      const category = categories.find(c => c.id === categoryId);
                      return (
                        <span
                          key={categoryId}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                        >
                          {category?.name || categoryId}
                          <button
                            type="button"
                            onClick={() => removeCategory(categoryId)}
                            className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Category Selection with Sub-categories */}
                <div className="border border-border rounded-lg max-h-60 overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category.id} className="border-b border-border last:border-b-0">
                      <div className="flex items-center p-3">
                        <label className="flex items-center flex-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCategoryToggle(category.id)}
                            className="mr-3 rounded border-border"
                          />
                          <div>
                            <span className="text-sm font-medium">{category.name}</span>
                            <p className="text-xs text-muted-foreground">{category.description}</p>
                          </div>
                        </label>
                        {category.subCategories && category.subCategories.length > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCategoryExpansion(category.id)}
                            className="p-1 h-auto ml-2"
                          >
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform ${expandedCategories.has(category.id) ? 'rotate-180' : ''}`} 
                            />
                          </Button>
                        )}
                      </div>

                      {/* Sub-categories */}
                      {category.subCategories && 
                       category.subCategories.length > 0 && 
                       expandedCategories.has(category.id) && (
                        <div className="pl-6 pb-3 bg-secondary/5">
                          <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                            Sub-categories
                          </div>
                          {category.subCategories.map((subCategory) => (
                            <label 
                              key={subCategory.id} 
                              className="flex items-center py-1 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSubCategories.includes(subCategory.id)}
                                onChange={() => handleSubCategoryToggle(subCategory.id)}
                                disabled={!selectedCategories.includes(category.id)}
                                className="mr-2 rounded border-border"
                              />
                              <div>
                                <span className="text-sm">{subCategory.name}</span>
                                {subCategory.description && (
                                  <p className="text-xs text-muted-foreground">
                                    {subCategory.description}
                                  </p>
                                )}
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {selectedCategories.length === 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Please select at least one main category
                  </p>
                )}
              </div>

              {/* Selected Sub-categories Display */}
              {selectedSubCategories.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2">Selected Sub-categories</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubCategories.map((subCategoryId) => {
                      const subCategory = availableSubCategories.find(s => s.id === subCategoryId);
                      return (
                        <span
                          key={subCategoryId}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                        >
                          {subCategory?.name || subCategoryId}
                          <button
                            type="button"
                            onClick={() => removeSubCategory(subCategoryId)}
                            className="ml-2 hover:bg-secondary/30 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₦)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Original Price (₦)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.originalPrice || ''}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Stock Count</label>
                <input
                  type="number"
                  min="0"
                  value={formData.stockCount}
                  onChange={(e) => handleInputChange('stockCount', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* NEW: Priority Number Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Priority Number</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.priority || ''}
                  onChange={(e) => handleInputChange('priority', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Optional - lower numbers appear first"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Products with priority numbers appear first (1 = highest priority). Leave empty for default sorting.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Product Image */}
          <Card>
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                onImageUploaded={handleImageUploaded}
                onImageRemoved={handleImageRemoved}
                currentImage={formData.image}
              />
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
              placeholder="Detailed product description..."
              required
            />
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Features
              <Button type="button" onClick={addFeature} variant="outline" size="sm" className="bg-white">
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder={`Feature ${index + 1}`}
                />
                {formData.features.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeFeature(index)}
                    variant="outline"
                    size="sm"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Specifications
              <Button type="button" onClick={addSpecification} variant="outline" size="sm" className="bg-white">
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {specifications.map((spec, index) => (
              <div key={index} className="grid grid-cols-5 gap-2 items-center">
                <input
                  type="text"
                  value={spec.key}
                  onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                  className="col-span-2 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Property name"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                  className="col-span-2 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Value"
                />
                {specifications.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    variant="outline"
                    size="sm"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel} className="bg-white">
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading || !formData.image || selectedCategories.length === 0} 
            className="btn-racing"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

