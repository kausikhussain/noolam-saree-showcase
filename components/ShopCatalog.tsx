"use client";
import { useState } from "react";
import { rack, rackFilters, type RackItem } from "@/lib/data";
import { useBag } from "@/components/store";
import { Bag, Heart, ArrowR, Sparkles } from "@/components/Icons";
import Link from "next/link";

export default function ShopCatalog() {
  const { add, formatPrice, liked, toggleLike, openCart } = useBag();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const activeFilterDef = rackFilters.find((f) => f.id === selectedFilter) || rackFilters[0];

  const filteredItems = rack
    .filter((item) => activeFilterDef.test(item))
    .filter((item) => {
      if (!searchQuery) return true;
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  const handleQuickAdd = (item: RackItem) => {
    add(item.name, item.price, 1, {
      type: item.cat === "silk" ? "SILK SAREE" : item.cat === "half" ? "HALF SAREE" : "BLOUSE",
      color: item.colors[0],
    });
    openCart();
  };

  return (
    <div className="catalog-wrapper">
      {/* Search and Filters Bar */}
      <div className="catalog-controls">
        <div className="catalog-chips">
          {rackFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`chip ${selectedFilter === f.id ? "on" : ""}`}
            >
              <span>{f.label}</span>
              <i>{rack.filter((item) => f.test(item)).length}</i>
            </button>
          ))}
        </div>

        <div className="catalog-search-sort">
          <input
            type="text"
            placeholder="Search our weaves..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="catalog-search-input"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="catalog-sort-select"
          >
            <option value="featured">Featured Collection</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="catalog-grid">
        {filteredItems.map((item, idx) => {
          const isLiked = liked.has(item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
          const itemId = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

          return (
            <div key={item.name} className="catalog-card">
              <Link href={`/product/${itemId}`} className="catalog-card-visual" style={{ background: item.colors[0] }}>
                <div
                  className="catalog-card-accent"
                  style={{
                    background: `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]} 50%, ${item.colors[2]} 100%)`,
                  }}
                />
                <div className="catalog-card-zari-border" style={{ borderColor: item.colors[2] }} />
                <span className="catalog-card-badge">
                  {item.cat === "silk" ? "Pure Silk" : item.cat === "half" ? "Half Saree" : "Handloom Blouse"}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleLike(itemId);
                  }}
                  className={`catalog-card-heart ${isLiked ? "liked" : ""}`}
                  aria-label="Save to wishlist"
                >
                  <Heart size={16} />
                </button>
                <div className="catalog-card-pattern">{item.pattern.toUpperCase()} WEAVE</div>
              </Link>

              <div className="catalog-card-details">
                <span className="catalog-card-cat">SUTRÉA HEIRLOOM</span>
                <Link href={`/product/${itemId}`}>
                  <h3 className="catalog-card-title">{item.name}</h3>
                </Link>
                <div className="catalog-card-price-row">
                  <span className="catalog-card-price">{formatPrice(item.price)}</span>
                  <button
                    onClick={() => handleQuickAdd(item)}
                    className="catalog-card-buy-btn"
                    title="Add to Shopping Bag"
                  >
                    <Bag size={14} />
                    <span>Acquire</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="catalog-empty">
          <Sparkles size={32} />
          <h3>No heirlooms found matching your criteria</h3>
          <p>Please adjust your search terms or category filters.</p>
        </div>
      )}
    </div>
  );
}

