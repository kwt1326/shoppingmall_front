type EventItemType = {
  id: number;
  path: string;
  imgSrc: string;
  gridArea: string;
}

const gridEventItem: Array<EventItemType> = [
  {
    id: 0,
    path: '',
    imgSrc: require('../assets/images/grida.jpeg').default,
    gridArea: 'a',
  },
  {
    id: 1,
    path: '',
    imgSrc: require('../assets/images/gridb.jpeg').default,
    gridArea: 'b',
  },
  {
    id: 2,
    path: '',
    imgSrc: require('../assets/images/gridc.jpeg').default,
    gridArea: 'c',
  },
  {
    id: 3,
    path: '',
    imgSrc: require('../assets/images/gridd.jpeg').default,
    gridArea: 'd',
  },
  {
    id: 4,
    path: '',
    imgSrc: require('../assets/images/gride.jpeg').default,
    gridArea: 'e',
  },
  {
    id: 5,
    path: '',
    imgSrc: require('../assets/images/gridf.jpeg').default,
    gridArea: 'f',
  },
]

export default gridEventItem;