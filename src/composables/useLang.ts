import { computed, ref, watch } from 'vue';
import { LANGS, MESSAGES, type Lang } from '@/lib/compliance';

const STORAGE_KEY = 'satech-lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as string[]).includes(saved)) return saved as Lang;
  } catch {
    // Storage can be unavailable (private mode, blocked site data); fall back to the browser language.
  }
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split('-')[0];
    if (base === 'ca' || base === 'es') return base;
  }
  return 'en';
}

// One shared language for every component on the page.
const lang = ref<Lang>(initialLang());

watch(lang, value => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Not persisting the choice is fine.
  }
});

export function useLang() {
  return { lang, t: computed(() => MESSAGES[lang.value]) };
}
