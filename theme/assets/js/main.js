window.showFire = function (text, icon = "success", title = "Thông báo") {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: icon,
    title: title,
    text: text,
    customClass: {
      popup: "shadow-lg border-0 rounded-3",
      title: "fw-bold fs-6",
    },
  });
};  

const navigate = (moduleName) => {
  const container = document.getElementById("app-container");
  container.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;

  fetch(`modules/${moduleName}.php`)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.text();
    })
    .then((html) => {
      container.innerHTML = html;

      if (!document.getElementById(`css-${moduleName}`)) {
        const link = document.createElement("link");
        link.id = `css-${moduleName}`;
        link.rel = "stylesheet";
        link.href = `assets/css/${moduleName}.css`;
        document.head.appendChild(link);
      }

      const oldScript = document.getElementById(`js-${moduleName}`);
      if (oldScript) oldScript.remove();

      const script = document.createElement("script");
      script.id = `js-${moduleName}`;
      script.src = `assets/js/${moduleName}.js?v=${new Date().getTime()}`;
      document.body.appendChild(script);

      document.querySelectorAll("#main-sidebar .nav-link").forEach((link) => {
        link.classList.remove("active");
        const onclickAttr = link.getAttribute("onclick");
        if (onclickAttr && onclickAttr.includes(moduleName)) {
          link.classList.add("active");
        }
      });

      if (location.hash !== `#${moduleName}`) {
        location.hash = moduleName;
      }
    })
    .catch((err) => {
      container.innerHTML = `<div class="alert alert-danger mt-3">Lỗi tải module: ${moduleName}</div>`;
    });
};

$(document).ready(() => {
  const initHash = location.hash.replace("#", "");
  navigate(initHash || "dashboard");

  $("#toggle-sidebar").on("click", function (e) {
    e.stopPropagation();
    if (window.innerWidth <= 992) {
      $("#main-sidebar").toggleClass("show-mobile");
    } else {
      $("#main-sidebar").toggleClass("collapsed");
    }
  });

  $(document).on("click", function (e) {
    if (
      window.innerWidth <= 992 &&
      !$(e.target).closest("#main-sidebar").length &&
      !$(e.target).closest("#toggle-sidebar").length
    ) {
      $("#main-sidebar").removeClass("show-mobile");
    }
  });
});

window.onhashchange = function () {
  const hash = location.hash.replace("#", "");
  if (hash) {
    navigate(hash);
  }
};