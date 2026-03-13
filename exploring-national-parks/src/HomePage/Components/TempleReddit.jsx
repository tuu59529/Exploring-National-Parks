import { useEffect, useState } from "react";

export default function RedditFeed({ subreddit = "reactjs" }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data.children.slice(0, 5));
      })
      .catch(console.error);
  }, [subreddit]);

  return (
    <div style={{ marginBottom: "40px", paddingBottom: '10px', backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", width: '60%', marginTop: '10px', marginLeft: '40px' }}>
      <h2 style={{ height: '50px', backgroundColor: '#A51C33', color: '#fff', paddingLeft: '10px', paddingTop: '10px'}}>Latest from r/{subreddit}</h2>

      {posts.map(({ data }) => (
        <div key={data.id} style={{ padding: "5px", paddingLeft: '15px' }}>
          <a
            href={`https://reddit.com${data.permalink}`}
            target="_blank"
            rel="noreferrer"
          >
            {data.title}
          </a>
        </div>
      ))}
    </div>
  );
}
