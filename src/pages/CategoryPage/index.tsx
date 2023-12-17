import React, { useState } from 'react';
import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import { mainCategory } from '@/constants/mainCategory';

const index = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const handleCategoryClick = (categoryId: any) => {
    setSelectedCategoryId(categoryId);
  };
  return (
    <div>
      <CategoryList categories={mainCategory} onCategoryClick={handleCategoryClick} />
      {selectedCategoryId && <ProductList />}
    </div>
  );
};

export default index;
