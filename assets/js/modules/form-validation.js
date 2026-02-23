export function initFormValidation(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const inputs = form.querySelectorAll('.input-field');

  const sanitizeInput = (input) => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
  };

  const validateField = (input) => {
    const value = input.value.trim();

    input.classList.remove('error', 'success');

    if (value === '') {
      input.classList.add('error');
      return false;
    }

    if (input.type === 'email' && !validateEmail(value)) {
      input.classList.add('error');
      return false;
    }

    if (input.type === 'tel' && !validatePhone(value)) {
      input.classList.add('error');
      return false;
    }

    input.classList.add('success');
    return true;
  };

  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      const btn = form.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        alert('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
        inputs.forEach(input => input.classList.remove('success', 'error'));
        btn.innerHTML = originalHTML;
        btn.disabled = false;
      }, 1500);
    }
  });
}
