import React from 'react';
import { setSort, SortType } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';
import style from './Sort.module.scss'; // Правильный импорт стилей
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export const SortTypes: SortType[] = [
  { sortProperty: 'name', name: 'По названию (А–Я)'},
  { sortProperty: '-name', name: 'По названию (Я–А)'},
  { sortProperty: 'price', name: 'По возрастанию цены' },
  { sortProperty: '-price', name: 'По убыванию цены' },
];

const Sort = () => {
  const sortRef = React.useRef<HTMLDivElement>(null)
  const dispatch = useDispatch();

  const { sort } = useSelector((state: RootState) => state.filter)
  const [isVisible, setVisible] = React.useState(false)
  const onChangeSort = (sort: SortType) => {
    dispatch(setSort(sort));
    setVisible(false)
  };
  React.useEffect(() => {
    const clickOutside = (event: globalThis.MouseEvent) => {
      const current = sortRef.current;
      const path = event.composedPath();
      if (current && !path.includes(current)) {
          setVisible(false);
      }
    }
    document.body.addEventListener('click', clickOutside)

    return () => {
      document.body.removeEventListener('click', clickOutside)
    }

  }, [])
  
  return (
    <div className={style.sort} ref={sortRef}>
      <b>Сортировать по: </b>
      <button className={style.sort__choice}onClick={() => {
        setVisible(!isVisible)
      }}>{sort.name}</button>
      {
        isVisible && (
        <div className={style.sort__list}>     
          <ul>
            <button className={style.sort__item} onClick={() => onChangeSort(SortTypes[0])}>
              {SortTypes[0].name}
            </button>
            <button className={style.sort__item} onClick={() => onChangeSort(SortTypes[1])}>
              {SortTypes[1].name}
            </button>
            <button className={style.sort__item} onClick={() => onChangeSort(SortTypes[2])}>
              {SortTypes[2].name}
            </button>
            <button className={style.sort__item} onClick={() => onChangeSort(SortTypes[3])}>
              {SortTypes[3].name}
            </button>
          </ul>
      </div>

        )
      }

    </div>
  );
};

export default Sort;
