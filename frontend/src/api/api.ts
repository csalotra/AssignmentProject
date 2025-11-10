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
  tags?: number[],
  pageUrl?: string
): Promise<PaginatedResponse<any>> => {
  const params = new URLSearchParams();

  if (q) params.append("q", q);
  if (category) params.append("category", category.toString());
  tags?.forEach(tag => params.append("tag", tag.toString()));

  const url = pageUrl || `${API_BASE}/products-search/`;
  const res = await axios.get(url, { params });
  return res.data;
}
