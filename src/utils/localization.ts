
import { TFunction } from "i18next";

export const getLocalizedValue = (
  t: TFunction,
  currentLang: string,
  valRu: string | undefined,
  valEn: string | undefined,
  systemVal: string,
  prefix: string = 'filter_'
) => {
  // If specific localized values exist, use them
  if (currentLang === 'ru' && valRu) return valRu;
  if (currentLang === 'en' && valEn) return valEn;
  
  // Fallback to the other language if current is missing but other exists (optional, but good for completeness)
  if (valRu && !valEn && currentLang === 'en') return valRu;
  if (valEn && !valRu && currentLang === 'ru') return valEn;

  // If no localized custom values, try to translate the system value
  if (!systemVal) return "";
  
  const lowerSystemVal = systemVal.toLowerCase();
  
  // Handle specific exceptions if needed (though consistent naming is better)
  if (lowerSystemVal === 'automatic') return t(`${prefix}auto`);
  
  // Try to translate using the prefix + system value (e.g., filter_petrol)
  // We use the systemVal as defaultValue so if no translation key exists, it shows the system value
  return t(`${prefix}${lowerSystemVal}`, { defaultValue: systemVal });
};
