export const baseUrl = 'http://localhost:8000';

export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export function formatDate(dateString, locale = 'es-AR') {
  if (!dateString) return "";

  const date = new Date(dateString);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };

  return date.toLocaleDateString(locale, options);
}

export function calculateAge(dateString) {
  if (!dateString) return null;

  const birthDate = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Si todavía no cumplio años esteaño, resto uno
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export function createSexoBadge(sexo) {
    const sexoText = sexo === 'M' ? 'Hombre' : 'Mujer';
    return `<span class="sexo-badge">${sexoText}</span>`;
}

