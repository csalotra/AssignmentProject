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
  const [selectedTag, setSelectedTag] = useState<number | "">("");

  const [loading, setLoading] = useState(false);
  const [loadingMoreProducts, setLoadingMoreProducts] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const tagRes = await fetchTags();
        setTags(tagRes.results);
        setNextTags(tagRes.next);

        const catRes = await fetchCategories();
        setCategories(catRes.results);
        setNextCategories(catRes.next);

        const prodRes = await fetchProducts();
        setProducts(prodRes.results);
        setNextProducts(prodRes.next);
      } catch (err) {
        console.error("Error loading data:", err);
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
        search,
        selectedCategory === "" ? undefined : selectedCategory,
        selectedTag === "" ? undefined : selectedTag
      );
      setProducts(res.results);
      setNextProducts(res.next);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (!nextProducts) return;
    setLoadingMoreProducts(true);
    try {
      const res = await fetchProducts(undefined, undefined, undefined, nextProducts);
      setProducts((prev) => [...prev, ...res.results]);
      setNextProducts(res.next);
    } finally {
      setLoadingMoreProducts(false);
    }
  };

  const loadMoreCategories = async () => {
    if (!nextCategories) return;
    try {
      const res = await fetchCategories(nextCategories);
      setCategories((prev) => [...prev, ...res.results]);
      setNextCategories(res.next);
    } catch (err) {
      console.error(err);
    }
  };

  const loadMoreTags = async () => {
    if (!nextTags) return;
    try {
      const res = await fetchTags(nextTags);
      setTags((prev) => [...prev, ...res.results]);
      setNextTags(res.next);
    } catch (err) {
      console.error(err);
    }
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
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        onSearch={handleSearch}
        onLoadMoreCategories={loadMoreCategories}
        onLoadMoreTags={loadMoreTags}
        hasMoreCategories={!!nextCategories}
        hasMoreTags={!!nextTags}
      />

      <main className="main-content">
        {loading && <p>Loading...</p>}

        {!loading && products.length > 0 && (
          <>
            <div className="grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {nextProducts && (
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <button onClick={loadMoreProducts} disabled={loadingMoreProducts}>
                  {loadingMoreProducts ? "Loading..." : "Load More Products"}
                </button>
              </div>
            )}
          </>
        )}

        {!loading && products.length === 0 && 
        <div className="no-results">
          <h2>No products found for given criteria</h2>
          <p>Try changing your search or filters.</p>
        </div>
        }
      </main>
      
      <Footer />
    </div>
  );
};

export default App;




