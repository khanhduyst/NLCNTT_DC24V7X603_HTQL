(function() {
    // Xử lý chung cho cả 2 form
    const forms = ['formAccountSettings', 'formChangePassword'];
    
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.onsubmit = function(e) {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;

                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Đang lưu...';

                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check me-2"></i> Đã cập nhật';
                    btn.className = 'btn btn-success rounded-pill px-4';
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.className = 'btn btn-primary rounded-pill px-4';
                        btn.disabled = false;
                        if(formId === 'formChangePassword') form.reset();
                    }, 1500);
                }, 1000);
            };
        }
    });
})();