import apiClient from './apiClient';
import type { Product } from '@/types';

export const getProducts = async (): Promise<Product> => {
  const response = await apiClient.get('/products');
  return response.data;
};