(function () {
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 32000000,
      sku: "WH-8821",
      img: "https://ui-avatars.com/api/?name=IP&background=e7e7ff&color=696cff",
    },
    {
      id: 2,
      name: "Laptop Gaming G5",
      price: 25000000,
      sku: "WH-0524",
      img: "https://ui-avatars.com/api/?name=LT&background=e7e7ff&color=696cff",
    },
    {
      id: 3,
      name: "Tai nghe Sony XM5",
      price: 8500000,
      sku: "WH-1234",
      img: "https://ui-avatars.com/api/?name=TN&background=e7e7ff&color=696cff",
    },
  ];

  const customers = [
    {
      id: 1,
      name: "Lê Khánh Duy",
      phone: "0354123456",
      rank: "Thành viên Bạc",
    },
    {
      id: 2,
      name: "Nguyễn Thành Nam",
      phone: "0901888999",
      rank: "Thành viên Vàng",
    },
  ];

  let cart = [];
  let selectedCustomer = null;

  const inputProdSearch = document.getElementById("search-product");
  const inputCusSearch = document.getElementById("input-search-customer");
  const resList = document.getElementById("customer-results");
  const btnRemoveCus = document.getElementById("btn-remove-customer");
  const btnAddNewCus = document.getElementById("btn-add-new-customer");
  const totalDiscountInput = document.getElementById("total-discount");
  const btnPay = document.getElementById("btn-checkout-pos");

  function renderProducts(filter = "") {
    const productList = document.getElementById("product-list-pos");
    if (!productList) return;
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.sku.toLowerCase().includes(filter.toLowerCase()),
    );
    productList.innerHTML = filtered
      .map(
        (p) => `
            <div class="col-md-3">
                <div class="card product-card h-100 shadow-none border">
                    <div class="p-3 text-center bg-light m-2 rounded-3"><img src="${p.img}" class="img-fluid" width="80"></div>
                    <div class="card-body pt-0 text-center">
                        <h6 class="fw-bold mb-1 small text-truncate">${p.name}</h6>
                        <p class="text-primary fw-bold mb-2 small">${p.price.toLocaleString()}đ</p>
                        <button class="btn btn-primary btn-sm rounded-3 w-100 btn-add" data-id="${p.id}"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");
    document
      .querySelectorAll(".btn-add")
      .forEach(
        (btn) => (btn.onclick = () => addToCart(parseInt(btn.dataset.id))),
      );
  }

  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const itemInCart = cart.find((item) => item.id === productId);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      cart.push({ ...product, quantity: 1, discountAmount: 0 });
    }
    renderCart();
  }

  window.updateQty = (id, change) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) cart = cart.filter((i) => i.id !== id);
      renderCart();
    }
  };

  window.updateItemDiscount = (id, val) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      item.discountAmount = parseFloat(val) || 0;
      renderCart();
    }
  };

  function renderCart() {
    const cartList = document.getElementById("cart-list");
    const subtotalEl = document.getElementById("cart-subtotal");
    if (!cartList) return;

    if (cart.length === 0) {
      cartList.innerHTML = `<div class="p-4 text-center text-muted mt-5"><i class="fas fa-shopping-basket fs-1 mb-2 opacity-25"></i><p class="small">Trống</p></div>`;
      subtotalEl.innerText = "0đ";
      calculateTotal(0);
      return;
    }

    let subtotal = 0;
    cartList.innerHTML = cart
      .map((item) => {
        const itemOriginalPrice = item.price * item.quantity;
        const itemDiscountedPrice = itemOriginalPrice - item.discountAmount;
        subtotal += itemDiscountedPrice;

        return `
                <div class="cart-item border-bottom py-3">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div class="fw-bold small" style="max-width: 65%">${item.name}</div>
                        <div class="text-primary small fw-bold">${itemDiscountedPrice.toLocaleString()}đ</div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="input-group input-group-sm w-auto">
                            <button class="btn btn-outline-secondary px-2" onclick="updateQty(${item.id}, -1)">-</button>
                            <input type="text" class="form-control text-center bg-white" value="${item.quantity}" style="width: 35px;" readonly>
                            <button class="btn btn-outline-secondary px-2" onclick="updateQty(${item.id}, 1)">+</button>
                        </div>
                        <div class="d-flex align-items-center gap-1">
                            <span class="text-muted" style="font-size: 10px;">Giảm (đ):</span>
                            <input type="number" class="form-control form-control-sm text-end" value="${item.discountAmount}" 
                                   style="width: 80px;" onchange="updateItemDiscount(${item.id}, this.value)">
                        </div>
                    </div>
                </div>
            `;
      })
      .join("");

    subtotalEl.innerText = subtotal.toLocaleString() + "đ";
    calculateTotal(subtotal);
  }

  function calculateTotal(subtotal) {
    const discountCash = parseFloat(totalDiscountInput?.value) || 0;
    const total = subtotal - discountCash;
    const totalEl = document.getElementById("cart-total");
    if (totalEl)
      totalEl.innerText = (total < 0 ? 0 : total).toLocaleString() + "đ";
  }

  if (totalDiscountInput) totalDiscountInput.oninput = () => renderCart();
  if (inputProdSearch)
    inputProdSearch.oninput = (e) => renderProducts(e.target.value);

  if (inputCusSearch && resList) {
    inputCusSearch.oninput = function () {
      const val = this.value.toLowerCase();
      if (val.length < 1) {
        resList.classList.add("d-none");
        return;
      }
      const matches = customers.filter(
        (c) => c.name.toLowerCase().includes(val) || c.phone.includes(val),
      );
      if (matches.length > 0) {
        resList.innerHTML = matches
          .map(
            (c) => `
                    <li class="list-group-item list-group-item-action cursor-pointer py-2 px-3" onclick="selectCustomer(${c.id})">
                        <div class="fw-bold small">${c.name}</div>
                        <small class="text-muted">${c.phone}</small>
                    </li>
                `,
          )
          .join("");
        resList.classList.remove("d-none");
      } else {
        resList.innerHTML = `<li class="list-group-item small text-muted">Không tìm thấy...</li>`;
        resList.classList.remove("d-none");
      }
    };
  }

  window.selectCustomer = function (id) {
    const cus = customers.find((c) => c.id === id);
    if (cus) {
      selectedCustomer = cus;
      document.getElementById("cus-name").innerText = cus.name;
      document.getElementById("cus-rank").innerText = cus.rank;
      document.getElementById("cus-avatar").src =
        `https://ui-avatars.com/api/?name=${cus.name.replace(/ /g, "+")}&background=696cff&color=fff`;
      if (btnRemoveCus) btnRemoveCus.classList.remove("d-none");
      resList.classList.add("d-none");
      inputCusSearch.value = "";
    }
  };

  if (btnRemoveCus) {
    btnRemoveCus.onclick = function () {
      selectedCustomer = null;
      document.getElementById("cus-name").innerText = "Khách vãng lai";
      document.getElementById("cus-rank").innerText = "Chưa có hạng thẻ";
      document.getElementById("cus-avatar").src =
        "https://ui-avatars.com/api/?name=Guest";
      this.classList.add("d-none");
    };
  }

  if (btnAddNewCus) {
    btnAddNewCus.onclick = () => {
      Swal.fire({
        title: '<h5 class="fw-bold mb-0">Thêm khách hàng mới</h5>',
        html: `
                <div class="text-start mt-3">
                    <label class="form-label small fw-bold">Họ và Tên <span class="text-danger">*</span></label>
                    <input id="swal-name" class="form-control mb-2" placeholder="Ví dụ: Nguyễn Thành Nam">
                    <label class="form-label small fw-bold">Số điện thoại <span class="text-danger">*</span></label>
                    <input id="swal-phone" class="form-control mb-2" placeholder="Ví dụ: 0901234567">
                    <label class="form-label small fw-bold">Email liên hệ</label>
                    <input id="swal-email" class="form-control mb-2" placeholder="nam.nt@gmail.com">
                    <label class="form-label small fw-bold">Tỉnh / Thành phố</label>
                    <input id="swal-city" class="form-control mb-2" placeholder="Ví dụ: Sóc Trăng">
                    <label class="form-label small fw-bold">Địa chỉ chi tiết</label>
                    <textarea id="swal-address" class="form-control" rows="2" placeholder="Số nhà, tên đường, phường/xã..."></textarea>
                </div>
            `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: '<i class="fas fa-save me-1"></i> Lưu thông tin',
        cancelButtonText: "Hủy bỏ",
        customClass: {
          confirmButton: "btn btn-primary rounded-pill px-4",
          cancelButton: "btn btn-outline-secondary rounded-pill px-4",
        },
        buttonsStyling: false,
        preConfirm: () => {
          const name = document.getElementById("swal-name").value;
          const phone = document.getElementById("swal-phone").value;
          if (!name || !phone) {
            Swal.showValidationMessage(
              "Vui lòng nhập Họ tên và Số điện thoại!",
            );
            return false;
          }
          return {
            name: name,
            phone: phone,
            email: document.getElementById("swal-email").value,
            city: document.getElementById("swal-city").value,
            address: document.getElementById("swal-address").value,
          };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const newCus = result.value;
          const newId = customers.length + 1;
          customers.push({
            id: newId,
            name: newCus.name,
            phone: newCus.phone,
            rank: "Khách mới",
            email: newCus.email,
            city: newCus.city,
            address: newCus.address,
          });
          selectCustomer(newId);
          Swal.fire({
            icon: "success",
            title: "Đã thêm khách hàng!",
            text: `Hệ thống đã ghi nhận khách hàng ${newCus.name}`,
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    };
  }

  if (btnPay) {
    btnPay.onclick = () => {
      if (cart.length === 0) {
        Swal.fire("Lỗi!", "Giỏ hàng trống!", "error");
        return;
      }

      const paymentMethod =
        document.querySelector('input[name="payment-method"]:checked')?.value ||
        "cash";

      if (paymentMethod === "debt" && !selectedCustomer) {
        Swal.fire(
          "Cảnh báo!",
          "Khách vãng lai không được phép ghi nợ. Vui lòng chọn khách hàng cụ thể!",
          "warning",
        );
        return;
      }

      Swal.fire({
        title: "Xác nhận thanh toán?",
        text: `Hình thức: ${paymentMethod === "cash" ? "Tiền mặt" : "Ghi nợ"} - Tổng thu: ${document.getElementById("cart-total").innerText}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Hoàn tất",
      }).then((result) => {
        if (result.isConfirmed) {
          if (paymentMethod === "debt") {
            console.log("Xử lý đẩy công nợ cho:", selectedCustomer.name);
          }
          Swal.fire("Xong!", "Đơn hàng đã được lưu.", "success");
          cart = [];
          selectedCustomer = null;
          renderCart();
          if (btnRemoveCus) btnRemoveCus.click();
        }
      });
    };
  }

  document.addEventListener("click", (e) => {
    if (
      inputCusSearch &&
      !inputCusSearch.contains(e.target) &&
      resList &&
      !resList.contains(e.target)
    ) {
      resList.classList.add("d-none");
    }
  });

  renderProducts();
})();
