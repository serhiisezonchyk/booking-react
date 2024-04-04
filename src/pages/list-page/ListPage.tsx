import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import Map from '../../components/map/Map';
import { listData } from '../../data/dummydata';
import { Apartment } from '../../data/types';

const ListPage = () => {
  const data: Apartment[] = listData;
  return (
    <div className="listPage container">
      <div className="listPage__list-container">
        <div className="list-container__wrapper hide-scroll">
          <Filter />
          {data.map((el) => (
            <Card key={el.id} item={el} />
          ))}
        </div>
      </div>
      <div className="listPage__map-container">
        <Map items={data}/>
      </div>
    </div>
  );
};

export default ListPage;
