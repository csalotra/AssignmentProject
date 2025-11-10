import React, { useEffect, useState } from "react";
import {
  fetchTags,
  fetchCategories,
  fetchProducts,
  Tag,
  Category,
  Product,
} from "./api/api";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import "./App.css";

const App: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [nextTags, setNextTags] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [nextCategories, setNextCategories] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [nextProducts, setNextProducts] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingMoreProducts, setLoadingMoreProducts] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [tagRes, catRes, prodRes] = await Promise.all([
          fetchTags(),
          fetchCategories(),
          fetchProducts(),
        ]);

        setTags(tagRes.results);
        setNextTags(tagRes.next);

        setCategories(catRes.results);
        setNextCategories(catRes.next);

        setProducts(prodRes.results);
        setNextProducts(prodRes.next);
      } catch (err) {
        console.error("Error loading initial data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetchProducts(
        search || undefined,
        selectedCategory === "" ? undefined : Number(selectedCategory),
        selectedTags.length > 0 ? selectedTags : undefined
      );
      setProducts(res.results);
      setNextProducts(res.next);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (!nextProducts || loadingMoreProducts) return;
    setLoadingMoreProducts(true);
    try {
      const res = await fetchProducts(
        search || undefined,
        selectedCategory === "" ? undefined : Number(selectedCategory),
        selectedTags.length > 0 ? selectedTags : undefined,
        nextProducts
      );
      setProducts(prev => [...prev, ...res.results]);
      setNextProducts(res.next);
    } catch (err) {
      console.error("Load more error:", err);
    } finally {
      setLoadingMoreProducts(false);
    }
  };

  const loadMoreCategories = async () => {
    if (!nextCategories) return;
    const res = await fetchCategories(nextCategories);
    setCategories(prev => [...prev, ...res.results]);
    setNextCategories(res.next);
  };

  const loadMoreTags = async () => {
    if (!nextTags) return;
    const res = await fetchTags(nextTags);
    setTags(prev => [...prev, ...res.results]);
    setNextTags(res.next);
  };

  return (
    <div className="app-container">
      <Header
        search={search}
        setSearch={setSearch}
        categories={categories}
        tags={tags}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}    
        onSearch={handleSearch}
        onLoadMoreCategories={loadMoreCategories}
        onLoadMoreTags={loadMoreTags}
        hasMoreCategories={!!nextCategories}
        hasMoreTags={!!nextTags}
      />

      <main className="main-content">
        {loading && <p className="text-center">Loading products...</p>}

        {!loading && products.length > 0 && (
          <>
            <div className="grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {nextProducts && (
              <div className="text-center my-8">
                <button
                  onClick={loadMoreProducts}
                  disabled={loadingMoreProducts}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loadingMoreProducts ? "Loading..." : "Load More Products"}
                </button>
              </div>
            )}
          </>
        )}

        {!loading && products.length === 0 && (
          <div className="no-results text-center py-16">
            <h2 className="text-2xl font-bold text-gray-700">No products found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;