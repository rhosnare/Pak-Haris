// File: js/produk.js
// Deskripsi: Render produk & fitur tambah ke keranjang

document.addEventListener("DOMContentLoaded", () => {
  const produkGrid = document.getElementById("produkGrid");
  const searchInput = document.getElementById("searchInput");

  const produkList = [
    {
      id: 1,
      nama: "Instagram Ads Paket A",
      harga: 350000,
      deskripsi: "Promosi 5 hari dengan targeting lokal.",
      gambar: "https://source.unsplash.com/600x400/?ads"
    },
    {
      id: 2,
      nama: "SEO Optimization Basic",
      harga: 500000,
      deskripsi: "Optimasi SEO untuk website dan konten.",
      gambar: "https://source.unsplash.com/600x400/?seo"
    },
    {
      id: 3,
      nama: "Brand Identity Kit",
      harga: 650000,
      deskripsi: "Logo, warna, dan tipografi brand lengkap.",
      gambar: "https://source.unsplash.com/600x400/?branding"
    },
    {
      id: 4,
      nama: "Landing Page Premium",
      harga: 900000,
      deskripsi: "Satu halaman website stylish & responsif.",
      gambar: "https://source.unsplash.com/600x400/?webdesign"
    }
  ];

  function renderProduk(data) {
    produkGrid.innerHTML = "";
    if (data.length === 0) {
      produkGrid.innerHTML = `<p style="text-align:center;">Produk tidak ditemukan.</p>`;
      return;
    }

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "produk-card";
      card.innerHTML = `
        <img src="${item.gambar}" alt="${item.nama}" />
        <h3>${item.nama}</h3>
        <p class="harga">Rp ${item.harga.toLocaleString("id-ID")}</p>
        <p class="deskripsi">${item.deskripsi}</p>
        <div>
          <a href="detail-produk.html?id=${item.id}" class="btn-detail">Lihat Detail</a>
          <button class="btn-cart" data-id="${item.id}">+ Keranjang</button>
        </div>
      `;
      produkGrid.appendChild(card);
    });

    // Re-bind tombol add to cart
    document.querySelectorAll(".btn-cart").forEach(button => {
      button.addEventListener("click", () => {
        const id = parseInt(button.dataset.id);
        const produk = produkList.find(p => p.id === id);
        tambahKeKeranjang(produk);
      });
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
    alert(`${produk.nama} berhasil ditambahkan ke keranjang!`);
  }

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const hasil = produkList.filter(p => p.nama.toLowerCase().includes(keyword));
    renderProduk(hasil);
  });

  renderProduk(produkList);
});
