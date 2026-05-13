(function () {
  const defaultTemplate = `
<div style="width: 100%; max-width: 800px; margin: 0 auto; font-family: 'Arial', sans-serif; color: #000;">
    <div style="text-align:center; margin-bottom: 20px;">
        <h2 style="margin:0; text-transform: uppercase;">{Ten_Cong_Ty}</h2>
        <p style="margin:5px 0; font-size: 14px;">{Dia_Chi}</p>
        <p style="margin:5px 0; font-size: 14px;">ĐT: {So_Dien_Thoai}</p>
        <h3 style="margin:20px 0 10px 0; border-top:1px dashed #000; border-bottom:1px dashed #000; padding: 10px 0;">HÓA ĐƠN BÁN HÀNG</h3>
    </div>

    <div style="margin-bottom: 15px; font-size: 14px;">
        <p style="margin:3px 0;">Khách hàng: <strong>{Ten_Khach_Hang}</strong></p>
        <p style="margin:3px 0;">Ngày in: {Ngay_Hien_Tai}</p>
    </div>

    <table style="width:100%; border-collapse: collapse; font-size: 14px;">
        <thead>
            <tr style="border-bottom: 1px solid #000;">
                <th style="text-align:left; padding: 5px 0;">Tên hàng</th>
                <th style="text-align:center; width: 40px;">SL</th>
                <th style="text-align:right; width: 100px;">T.Tiền</th>
            </tr>
        </thead>
        <tbody>
            <tr style="border-bottom: 1px dashed #eee;">
                <td style="padding: 8px 0;">Sản phẩm mẫu 01</td>
                <td style="text-align:center;">1</td>
                <td style="text-align:right;">150.000</td>
            </tr>
        </tbody>
    </table>

    <div style="margin-top: 15px; text-align: right; font-size: 15px;">
        <p style="margin:5px 0;">Tổng cộng: <strong>{Tong_Tien} đ</strong></p>
    </div>
    
    <div style="text-align:center; margin-top: 30px; font-style: italic; font-size: 12px;">
        <p>Cảm ơn quý khách. Hẹn gặp lại!</p>
    </div>
</div>
`;

  function initCKEditor() {
    if (typeof CKEDITOR !== "undefined") {
      if (CKEDITOR.instances["print_editor_input"]) {
        CKEDITOR.instances["print_editor_input"].destroy(true);
      }

      // Khởi tạo đơn giản, bản FULL sẽ tự nhận các tính năng căn lề
      CKEDITOR.replace("print_editor_input", {
        height: 400,
        removeButtons: "Image,Flash,Iframe,About",
        // Đảm bảo nội dung không bị lọc mất các thẻ style
        allowedContent: true,
      });

      CKEDITOR.instances["print_editor_input"].setData(defaultTemplate);
    }
  }

  const modalEl = document.getElementById("modalPrintEditor");
  if (modalEl) {
    modalEl.addEventListener("shown.bs.modal", function () {
      initCKEditor();
    });
  }

  const saveBtn = document.getElementById("save-print-template");
  if (saveBtn) {
    saveBtn.onclick = function () {
      if (CKEDITOR.instances["print_editor_input"]) {
        const data = CKEDITOR.instances["print_editor_input"].getData();
        console.log("Dữ liệu đã lưu:", data);

        saveBtn.innerHTML = '<i class="fas fa-check"></i> Đã lưu';
        saveBtn.classList.replace("btn-success", "btn-primary");

        setTimeout(() => {
          saveBtn.innerHTML = "Lưu mẫu in";
          saveBtn.classList.replace("btn-primary", "btn-success");
          bootstrap.Modal.getInstance(modalEl).hide();
        }, 800);
      }
    };
  }
})();
