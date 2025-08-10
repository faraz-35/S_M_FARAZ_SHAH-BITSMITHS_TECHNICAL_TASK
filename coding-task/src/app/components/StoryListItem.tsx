// app/components/StoryListItem.tsx
import { Story } from '../../types';

interface StoryListItemProps {
  story: Story;
  index: number;
}

const StoryListItem: React.FC<StoryListItemProps> = ({ story, index }) => {
  const { title, by, url } = story;
  const domain = url ? new URL(url).hostname : '';

  return (
    <li className="py-4 flex">
      <span className="text-gray-500 w-6 text-right mr-2">{index}.</span>
      <div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-black hover:underline"
        >
          {title}
        </a>
        {domain && <span className="text-gray-500 text-sm ml-2">({domain})</span>}
        <p className="text-sm text-gray-500">by {by}</p>
      </div>
    </li>
  );
};

export default StoryListItem;
