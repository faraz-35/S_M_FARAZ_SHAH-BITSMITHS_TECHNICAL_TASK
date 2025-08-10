// app/components/StoryList.tsx
import { Story } from '../../types';
import StoryListItem from './StoryListItem';

interface StoryListProps {
  stories: Story[];
  startIndex: number;
}

const StoryList: React.FC<StoryListProps> = ({ stories, startIndex }) => {
  return (
    <ol className="divide-y divide-gray-200">
      {stories.map((story, index) => (
        <StoryListItem key={story.id} story={story} index={startIndex + index + 1} />
      ))}
    </ol>
  );
};

export default StoryList;
