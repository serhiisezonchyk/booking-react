import { Post } from '../../data/types';
import Card from '../card/Card';
interface ListProps {
  posts: Post[];
}
const List = ({ posts }: ListProps) => {
  return (
    <div className="item-list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
