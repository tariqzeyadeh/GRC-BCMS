import { Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation('navbar');
  const label = theme === 'dark' ? t('Switch to light mode') : t('Switch to dark mode');

  return (
    <Button
      variant="ghost"
      size="sm"
      className="p-2 h-auto"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
    </Button>
  );
};

export default ThemeToggle;
