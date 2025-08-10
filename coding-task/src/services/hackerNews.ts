
import { Story } from '../types';
import { HACKER_NEWS_API_URL } from '../constants';

export async function getTopStoryIds(): Promise<number[]> {
  const response = await fetch(`${HACKER_NEWS_API_URL}/topstories.json`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  if (!response.ok) {
    throw new Error('Failed to fetch top story IDs');
  }
  return response.json();
}

export async function getStory(id: number): Promise<Story> {
  const response = await fetch(`${HACKER_NEWS_API_URL}/item/${id}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch story with id: ${id}`);
  }
  return response.json();
}
