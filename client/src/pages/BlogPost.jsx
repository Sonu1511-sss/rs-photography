import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import api from '../utils/api';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    api
      .get(`/blogs/slug/${slug}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Blog not found</h1>
        <Link
          to="/blog"
          className="text-wedding-gold underline font-semibold"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.excerpt || ''}
        keywords="wedding photography blog, rs photography blog"
      />
      <div className="pt-20 pb-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-elegant font-bold mb-4">
            {blog.title}
          </h1>
          <div
            className="prose max-w-none mt-6"
            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
          />
        </div>
      </div>
    </>
  );
};

export default BlogPost;

