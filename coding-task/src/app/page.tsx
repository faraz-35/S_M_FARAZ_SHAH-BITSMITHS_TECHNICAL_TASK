// app/page.tsx
import StoryList from './components/StoryList';
import Pagination from './components/Pagination';
import { Story } from '../types';

const HACKER_NEWS_API_URL = 'https://hacker-news.firebaseio.com/v0';

async function getTopStoryIds(): Promise<number[]> {
  const response = await fetch(`${HACKER_NEWS_API_URL}/topstories.json`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  if (!response.ok) {
    throw new Error('Failed to fetch top story IDs');
  }
  return response.json();
}

async function getStory(id: number): Promise<Story> {
  const response = await fetch(`${HACKER_NEWS_API_URL}/item/${id}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch story with id: ${id}`);
  }
  return response.json();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const storiesPerPage = 10;

  try {
    const topStoryIds = await getTopStoryIds();
    const paginatedStoryIds = topStoryIds.slice(
      (page - 1) * storiesPerPage,
      page * storiesPerPage
    );

    const stories = await Promise.all(
      paginatedStoryIds.map((id) => getStory(id))
    );

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-orange-600">Hacker News</h1>
        <StoryList stories={stories} />
        <Pagination
          currentPage={page}
          totalStories={topStoryIds.length}
          storiesPerPage={storiesPerPage}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Error fetching stories
        </h1>
        <p>{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
      </div>
    );
  }
}