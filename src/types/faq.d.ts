export interface FaqEntry {
  slug: string;
  title: string;
  content: string;
  category: string;
  order: number;
  tags: string[];
}

export interface FaqListItem {
  slug: string;
  title: string;
  category: string;
  order: number;
  tags: string[];
}
