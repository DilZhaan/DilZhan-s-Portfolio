import { useState, useEffect } from "react";
import blogConfig from "../../../data/blog.json";

function BlogCard({ post, readMoreText }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all flex flex-col"
    >
      {post.thumbnail && !imageError && (
        <div className="aspect-video w-full overflow-hidden bg-gray-900 relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-800 w-full h-full"></div>
            </div>
          )}
          <img
            src={post.thumbnail}
            alt={post.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-500">{post.pubDate}</span>
          {post.categories.length > 0 && (
            <>
              <span className="text-gray-700">•</span>
              <span className="text-sm text-gray-500 line-clamp-1">
                {post.categories[0]}
              </span>
            </>
          )}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
          {post.description}
        </p>
        <div className="flex items-center text-gray-500 text-sm group-hover:text-gray-400 transition-colors">
          <span>{readMoreText}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const {
    title,
    mediumUsername,
    mediumProfileUrl,
    viewButtonText,
    readMoreText,
    errorText,
    noPostsText,
    visitProfileText,
    maxPosts
  } = blogConfig;

  const displayedPosts = showAll ? posts : posts.slice(0, maxPosts);
  const hasMorePosts = posts.length > maxPosts;

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        setLoading(true);
        const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;
        
        const response = await fetch(RSS_URL);
        const data = await response.json();
        
        if (data.status === 'ok') {
          // Get all posts, not just maxPosts
          const articles = data.items.map(item => {
            // Extract first image from content if thumbnail not available
            let thumbnail = item.thumbnail || item.enclosure?.link;
            
            if (!thumbnail && item.description) {
              const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch && imgMatch[1]) {
                thumbnail = imgMatch[1];
              }
            }
            
            return {
              title: item.title,
              link: item.link,
              pubDate: new Date(item.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }),
              description: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
              thumbnail: thumbnail,
              categories: item.categories || []
            };
          });
          setPosts(articles);
        } else {
          setError(errorText);
        }
      } catch (err) {
        console.error('Error fetching Medium posts:', err);
        setError(errorText);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, [mediumUsername, maxPosts, errorText]);

  return (
    <section id="blog" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {title}
          </h2>
          <a
            href={mediumProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-colors flex items-center gap-2"
          >
            <span>{viewButtonText}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
            </svg>
          </a>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-gray-400">{error}</p>
            <a
              href={mediumProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-white hover:text-gray-300 transition-colors"
            >
              {visitProfileText}
            </a>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedPosts.map((post, index) => (
                <BlogCard key={index} post={post} readMoreText={readMoreText} />
              ))}
            </div>
            
            {hasMorePosts && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-8 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-colors flex items-center gap-2"
                >
                  <span>{showAll ? 'Show Less' : 'Show More'}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform ${showAll ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">{noPostsText}</p>
            <a
              href={mediumProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white hover:text-gray-300 transition-colors"
            >
              {visitProfileText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;
