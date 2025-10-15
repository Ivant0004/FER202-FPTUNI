import React from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieCardGrid from "../components/Movies/MovieCard";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />

      <div className="mt-4" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 12px" }}>
        <h4 className="mb-3">Featured Movies Collections</h4>
        <p className="text-secondary">Bộ sưu tập phim nổi bật.</p>
        <MovieCardGrid />
      </div>
    </div>
  );
}
