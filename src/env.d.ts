interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_STATIC_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  // добавьте другие переменные окружения здесь...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
