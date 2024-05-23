import React from "react";
import Lottie from "lottie-react";
import { getArticles } from "../utils/utils";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import SortOrder from "./SortOrder";
import loadingGraphic from "../assets/loadingGraphic.json";

const ArticlesList = () => {
  const [articles, setArticles] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [sort, setSort] = React.useState("");
  const [order, setOrder] = React.useState("");

  const topicQuery = searchParams.get("topic");

  React.useEffect(() => {
    getArticles(topicQuery, sort, order).then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, [topicQuery, sort, order]);

  if (loading) {
    return (
      <div>
        <Lottie animationData={loadingGraphic} />
      </div>
    );
  }

  return (
    <div>
      <SortOrder setSort={setSort} setOrder={setOrder} />
      <section className="articles-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.article_id}
            article_id={article.article_id}
            topic={`${article.topic}`}
            author={article.author}
            title={article.title}
            created_at={article.created_at}
            article_img_url={article.article_img_url}
          />
        ))}
      </section>
    </div>
  );
};

export default ArticlesList;
