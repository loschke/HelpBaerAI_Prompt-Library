import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { cache } from 'react';
import { FaqEntry, FaqListItem } from '../types/faq';

const faqDirectory = path.join(process.cwd(), 'content/faq');

// Create faq directory if it doesn't exist
async function ensureDirectory() {
  try {
    await fs.access(faqDirectory);
  } catch {
    await fs.mkdir(faqDirectory, { recursive: true });
  }
}

// Get all FAQ entries
export const getAllFaqs = cache(async (): Promise<FaqListItem[]> => {
  await ensureDirectory();

  try {
    const fileNames = await fs.readdir(faqDirectory);
    const allFaqsData = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(faqDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const matterResult = matter(fileContents);

          return {
            slug,
            title: matterResult.data.title,
            category: matterResult.data.category,
            order: matterResult.data.order || 0,
            tags: matterResult.data.tags || [],
          };
        })
    );

    // Sort FAQs by category and then by order
    return allFaqsData.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.order - b.order;
    });
  } catch (error) {
    console.error('Error getting all FAQs:', error);
    return [];
  }
});

// Get FAQs by category
export const getFaqsByCategory = cache(async (category: string): Promise<FaqListItem[]> => {
  const allFaqs = await getAllFaqs();
  return allFaqs.filter(faq => faq.category === category);
});

// Get FAQs by tag
export const getFaqsByTag = cache(async (tag: string): Promise<FaqListItem[]> => {
  const allFaqs = await getAllFaqs();
  return allFaqs.filter(faq => faq.tags.includes(tag));
});

// Get a single FAQ by slug
export const getFaqBySlug = cache(async (slug: string): Promise<FaqEntry | null> => {
  await ensureDirectory();

  try {
    const fullPath = path.join(faqDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const contentHtml = await marked.parse(matterResult.content);

    return {
      slug,
      title: matterResult.data.title,
      content: contentHtml,
      category: matterResult.data.category,
      order: matterResult.data.order || 0,
      tags: matterResult.data.tags || [],
    };
  } catch (error) {
    console.error(`Error getting FAQ ${slug}:`, error);
    return null;
  }
});
