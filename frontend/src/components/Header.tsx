import React from "react";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  selectedCategory: number | "";
  setSelectedCategory: (value: number | "") => void;
  selectedTags: number[];
  setSelectedTags: React.Dispatch<React.SetStateAction<number[]>>;
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
  selectedTags,
  setSelectedTags,
  onSearch,
  onLoadMoreCategories,
  onLoadMoreTags,
  hasMoreCategories,
  hasMoreTags,
}) => {
  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "__load_more__") {
      onLoadMoreTags();
      return;
    }

    const tagId = Number(value);
    if (isNaN(tagId)) return;

    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      }
      return [...prev, tagId];
    });
  };

  const removeTag = (id: number) => {
    setSelectedTags((prev) => prev.filter((t) => t !== id));
  };

  const clearTags = () => setSelectedTags([]);

  return (
    <header className="header bg-white shadow-md sticky top-0 z-50">
      <div className="header-wrapper">
        <h1 className="logo">Remarcable Product Store</h1>

        <div className="search-container">
          <div className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
            />

            <select
              value={selectedCategory}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "__load_more__") {
                  onLoadMoreCategories();
                } else {
                  setSelectedCategory(val === "" ? "" : Number(val));
                }
              }}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
              {hasMoreCategories && (
                <option value="__load_more__">Load More Categories...</option>
              )}
            </select>

            <div className="tag-select-wrapper">
              <select
                multiple
                value={selectedTags.map(String)}
                onChange={handleTagChange}
                className="tag-multi-select"
                title="Hold Ctrl (Cmd) to select multiple"
              >
                <option value="" disabled>
                  Select Tags
                </option>
                {tags.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
                {hasMoreTags && (
                  <option value="__load_more__">Load More Tags...</option>
                )}
              </select>
            </div>

            <button onClick={onSearch}>Search</button>
          </div>

          {selectedTags.length > 0 && (
            <div className="selected-tags-chips">
              <span>Tags:</span>
              {selectedTags.map((id) => {
                const tag = tags.find((t) => t.id === id);
                return tag ? (
                  <span key={id} className="tag-chip">
                    {tag.name}
                    <button onClick={() => removeTag(id)} className="remove-tag">
                      ×
                    </button>
                  </span>
                ) : null;
              })}
              <button onClick={clearTags} className="clear-tags">
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
