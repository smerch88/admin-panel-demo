"use client";

interface LocaleSwitcherProps {
  selectedLocale: string;
  onLocaleChange: (locale: string) => void;
  locales?: string[];
  label?: string;
}

export const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({
  selectedLocale,
  onLocaleChange,
  locales = ["ua", "en"],
  label = "Мова:",
}) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex bg-white rounded-lg shadow-sm border">
        {locales.map(locale => (
          <button
            key={locale}
            onClick={() => onLocaleChange(locale)}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              selectedLocale === locale
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {locale.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};
