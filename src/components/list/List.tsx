import { listData } from '../../data/dummydata';
import Card from '../card/Card';

const List = () => {
  return (
    <div className="item-list">
      {listData.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
