export interface Article {
  title: string;
  headline: string;
  hashtags: string[];
  createdAt: string;
  coverUrl: string;
  source: string;
  author: string;
  authorImage: string;
  authorLink: string;
  slug: string;
  body: string;
}

export interface Toc {
  anchor: string;
  text: string;
}