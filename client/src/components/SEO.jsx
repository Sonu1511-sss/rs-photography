import { useEffect } from 'react';

// Lightweight SEO helper without external dependencies
const SEO = ({ title, description, keywords }) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | RS Photography`
      : 'RS Photography - Wedding Photographer in Balaghat & Katangi';

    if (typeof document !== 'undefined') {
      document.title = fullTitle;

      if (description) {
        let descTag = document.querySelector('meta[name="description"]');
        if (!descTag) {
          descTag = document.createElement('meta');
          descTag.name = 'description';
          document.head.appendChild(descTag);
        }
        descTag.content = description;
      }

      if (keywords) {
        let keywordsTag = document.querySelector('meta[name="keywords"]');
        if (!keywordsTag) {
          keywordsTag = document.createElement('meta');
          keywordsTag.name = 'keywords';
          document.head.appendChild(keywordsTag);
        }
        keywordsTag.content = keywords;
      }
    }
  }, [title, description, keywords]);

  return null;
};

export default SEO;

