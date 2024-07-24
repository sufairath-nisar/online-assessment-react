import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products); 
      } catch (error) {
        console.error('Error fetching all products:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  return (
    <div className='md:min-h-96'>
   <div className="p-6 bg-gray-50">
      <div className="overflow-x-auto">
        <table className="table w-full border-separate border-spacing-0 border border-gray-300">
       
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 border-b border-gray-300">Id</th>
              <th className="py-3 px-4 border-b border-gray-300">Name</th>
              <th className="py-3 px-4 border-b border-gray-300">Description</th>
              <th className="py-3 px-4 border-b border-gray-300">Image</th>

            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b border-gray-300">{product.id}</td>
                <td className="py-3 px-4 border-b border-gray-300">{product.title}</td>
                <td className="py-3 px-4 border-b border-gray-300">{product.description}</td>
                <td className="py-3 px-4 border-b border-gray-300">
                    <img
                      src={product.image}  
                      alt={product.title}
                      className="w-16 h-16 object-cover" 
                    />
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default App;
