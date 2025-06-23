// File: detail.js
// Fungsi: Render produk berdasarkan ID dari URL & tambah ke keranjang
console.log("✅ Script jalan");
console.log("ID dari URL:", getProductId());
console.log("Produk List:", produkList);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("detailContainer");
  const cartCount = document.getElementById("cart-count");

  // Daftar produk dummy
  const produkList = [
    {
      id: 1,
      nama: "Instagram Ads Paket A",
      harga: 350000,
      deskripsi: "Promosi 5 hari dengan targeting lokal.",
      gambar: "https://source.unsplash.com/800x500/?ads"
    },
    {
      id: 2,
      nama: "SEO Optimization Basic",
      harga: 500000,
      deskripsi: "Optimasi SEO untuk website dan konten.",
      gambar: "https://source.unsplash.com/800x500/?seo"
    },
    {
      id: 3,
      nama: "Brand Identity Kit",
      harga: 650000,
      deskripsi: "Logo, warna, dan tipografi brand lengkap.",
      gambar: "https://source.unsplash.com/800x500/?branding"
    },
    {
      id: 4,
      nama: "Landing Page Premium",
      harga: 900000,
      deskripsi: "Satu halaman website stylish & responsif.",
      gambar: "https://source.unsplash.com/800x500/?webdesign"
    },
    {
      id: 5,
      nama: "Content Creator Package",
      harga: 450000,
      deskripsi: "Desain feed IG & TikTok reel.",
      gambar: "https://source.unsplash.com/800x500/?content"
    },
    {
      id: 6,
      nama: "Google Ads Express",
      harga: 800000,
      deskripsi: "Kampanye iklan Google berskala cepat.",
      gambar: "https://source.unsplash.com/800x500/?google"
    },
    {
      id: 7,
      nama: "Video Iklan Cinematic",
      harga: 1000000,
      deskripsi: "Iklan video promosi profesional berdurasi 30 detik.",
      gambar: "https://source.unsplash.com/800x500/?video"
    },
    {
      id: 8,
      nama: "Logo Animation Intro",
      harga: 300000,
      deskripsi: "Animasi pembuka logo untuk branding YouTube.",
      gambar: "https://source.unsplash.com/800x500/?animation"
    },
    {
      id: 9,
      nama: "Social Media Management",
      harga: 750000,
      deskripsi: "Kelola semua sosial media-mu biar aktif dan konsisten.",
      gambar: "https://source.unsplash.com/800x500/?social"
    },
    {
      id: 10,
      nama: "Full Digital Campaign",
      harga: 2500000,
      deskripsi: "Semua layanan digital marketing dalam satu paket.",
      gambar: "https://source.unsplash.com/800x500/?digital"
    }
];

  function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
  }

  function renderDetail(produk) {
    container.innerHTML = `
      <div class="detail-wrapper">
        <img src="${produk.gambar}" alt="${produk.nama}" class="detail-image">
        <div class="detail-info">
          <h1>${produk.nama}</h1>
          <p class="harga">Rp ${produk.harga.toLocaleString("id-ID")}</p>
          <p class="deskripsi">${produk.deskripsi}</p>
          <button id="btnAddToCart" class="btn-cart">+ Tambah ke Keranjang</button>
        </div>
      </div>
    `;

    document.getElementById("btnAddToCart").addEventListener("click", () => {
      tambahKeKeranjang(produk);
    });
  }

  function tambahKeKeranjang(produk) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.id === produk.id);
    if (index > -1) {
      cart[index].jumlah += 1;
    } else {
      cart.push({ ...produk, jumlah: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produk berhasil ditambahkan ke keranjang!");
    updateCartCount();
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.jumlah, 0);
    cartCount.textContent = total;
  }

  // Jalankan
  const id = getProductId();
  const produk = produkList.find(p => p.id == id); // pakai == biar auto konversi string ↔ number
  if (produk) {
    renderDetail(produk);
    updateCartCount();
  } else {
    container.innerHTML = `<p style="padding:2rem;text-align:center;">Produk tidak ditemukan.</p>`;
  }
});
