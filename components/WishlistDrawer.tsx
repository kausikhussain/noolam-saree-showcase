"use client";
import { useBag } from "./store";
import { Close, Trash, ArrowR, Bag, Heart } from "./Icons";
import { looks, silkCards, rack } from "@/lib/data";

export default function WishlistDrawer() {
  const { liked, toggleLike, add, isWishlistOpen, closeWishlist, openCart, formatPrice } = useBag();

  if (!isWishlistOpen) return null;

  // Resolve liked items across catalog
  const allProducts: { id: string; name: string; price: number; color?: string; type: string }[] = [];

  // From looks (sarees & blouses)
  looks.forEach((l) => {
    l.items.forEach((it) => {
      allProducts.push({
        id: it.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: it.name,
        price: it.price,
        color: it.color,
        type: it.type,
      });
    });
  });

  // From silkCards
  silkCards.forEach((c) => {
    allProducts.push({
      id: c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: c.title,
      price: c.price,
      color: c.colors[0],
      type: "PURE SILK",
    });
  });

  // From rack
  rack.forEach((r) => {
    allProducts.push({
      id: r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: r.name,
      price: r.price,
      color: r.colors[0],
      type: r.cat.toUpperCase(),
    });
  });

  // Unique liked items
  const likedItems = Array.from(liked)
    .map((k) => allProducts.find((p) => p.id === k || p.name === k))
    .filter(Boolean) as { id: string; name: string; price: number; color?: string; type: string }[];

  const handleMoveToBag = (item: { id: string; name: string; price: number; color?: string; type: string }) => {
    add(item.name, item.price, 1, { id: item.id, color: item.color, type: item.type });
    toggleLike(item.id);
    closeWishlist();
    openCart();
  };

  return (
    <div className="drawer-overlay" onClick={closeWishlist}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <h3 className="drawer-title">SAVED HEIRLOOMS</h3>
            <span className="drawer-count">{liked.size} {liked.size === 1 ? "item" : "items"}</span>
          </div>
          <button className="drawer-close" onClick={closeWishlist} aria-label="Close wishlist">
            <Close size={20} />
          </button>
        </div>

        {likedItems.length === 0 ? (
          <div className="drawer-empty">
            <Heart size={36} className="maroon" />
            <h4>Your wishlist is empty</h4>
            <p>Save sarees and blouses as you browse by clicking the heart icon on any piece.</p>
            <a href="#silk" onClick={closeWishlist} className="btn btn-maroon">
              <span>Browse Silks</span>
              <span className="btn-dot"><ArrowR size={15} /></span>
            </a>
          </div>
        ) : (
          <div className="drawer-body">
            <div className="drawer-items">
              {likedItems.map((item) => (
                <div key={item.id} className="cart-card">
                  <div className="cart-card-swatch" style={{ background: item.color || "#7e1529" }}>
                    <span className="swatch-symbol">⚜</span>
                  </div>
                  <div className="cart-card-info">
                    <span className="cart-card-type">{item.type}</span>
                    <h4 className="cart-card-name">{item.name}</h4>
                    <div className="cart-card-price">{formatPrice(item.price)}</div>
                  </div>
                  <div className="cart-card-actions">
                    <button
                      onClick={() => handleMoveToBag(item)}
                      className="btn btn-maroon btn-sm"
                      title="Move to Bag"
                    >
                      <Bag size={14} />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="cart-remove-btn"
                      title="Remove from wishlist"
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
