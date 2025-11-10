import React from "react";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  selectedCategory: number | "";
  setSelectedCategory: (value: number | "") => void;
  selectedTag: number | "";
  setSelectedTag: (value: number | "") => void;
  onSearch: () => void;
  onLoadMoreCategories: () => void;
  onLoadMoreTags: () => void;
  hasMoreCategories: boolean;
  hasMoreTags: boolean;
}

const Header: React.FC<HeaderProps> = ({
  search,
  setSearch,
  categories,
  tags,
  selectedCategory,
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
  onSearch,
  onLoadMoreCategories,
  onLoadMoreTags,
  hasMoreCategories,
  hasMoreTags,
}) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Remarcable Product Store</h1>

        <div className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => {
              if (e.target.value === "__load_more__") {
                onLoadMoreCategories();
              } else {
                setSelectedCategory(e.target.value === "" ? "" : Number(e.target.value));
              }
            }}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
            {hasMoreCategories && <option value="__load_more__">Load More Categories...</option>}
          </select>

          <select
            value={selectedTag}
            onChange={(e) => {
              if (e.target.value === "__load_more__") {
                onLoadMoreTags();
              } else {
                setSelectedTag(e.target.value === "" ? "" : Number(e.target.value));
              }
            }}
          >
            <option value="">All Tags</option>
            {tags.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
            {hasMoreTags && <option value="__load_more__">Load More Tags...</option>}
          </select>

          <button onClick={onSearch}>Search</button>
        </div>
      </div>
    </header>
  );
};

export default Header;


