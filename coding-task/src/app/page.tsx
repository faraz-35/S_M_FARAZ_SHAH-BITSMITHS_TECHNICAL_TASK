
// app/page.tsx
import StoryList from './components/StoryList';
import Pagination from './components/Pagination';
import { getTopStoryIds, getStory } from '../services/hackerNews';

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const storiesPerPage = 10;
  const startIndex = (page - 1) * storiesPerPage;

  try {
    const topStoryIds = await getTopStoryIds();
    const paginatedStoryIds = topStoryIds.slice(
      startIndex,
      startIndex + storiesPerPage
    );

    const stories = await Promise.all(
      paginatedStoryIds.map((id) => getStory(id))
    );

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-orange-600">Hacker News</h1>
        <StoryList stories={stories} startIndex={startIndex} />
        <Pagination
          currentPage={page}
          totalStories={topStoryIds.length}
          storiesPerPage={storiesPerPage}
        />
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Error fetching stories
        </h1>
        <p>There was an error fetching the stories. Please try again later.</p>
      </div>
    );
  }
}