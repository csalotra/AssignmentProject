import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  short_description: string;
  description: string;
  price: number;
  category: Category;
  tags: Tag[];
}

export const fetchTags = async (url?: string): Promise<PaginatedResponse<{ id: number; name: string }>> => {
  const res = await axios.get(url || `${API_BASE}/tags/`);
  return res.data;
};

export const fetchCategories = async (url?: string): Promise<PaginatedResponse<{ id: number; name: string }>> => {
  const res = await axios.get(url || `${API_BASE}/categories/`);
  return res.data;
};

export const fetchProducts = async (
  q?: string,
  category?: number,
  tag?: number,
  pageUrl?: string
): Promise<PaginatedResponse<any>> => {
  const params: any = {};
  if (q) params.q = q;
  if (category) params.category = category;
  if (tag) params.tag = tag;

  const res = await axios.get(pageUrl || `${API_BASE}/products-search/`, { params });
  return res.data;
};
