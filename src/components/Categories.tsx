import React from 'react'
import styles from "../scss/category.module.scss"


export const categories = ['Все', 'Еда', 'Одежда', 'Электроника'];
type CategoriesProps = {
    value: number,
    setValue: (i: number) => void,
    refreshCurrentPage: (i: number) => void
}

export const Categories: React.FC<CategoriesProps> = ({setValue, refreshCurrentPage, value}) => {
  
  return (
    <>      
    <div className={styles.category}>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`${index === value ? styles.category__button_active : styles.category__button}`}
            onClick={() => {
              setValue(index)
              refreshCurrentPage(1)
            }}
            >
            {category}
          </button>
        ))}
      </div></>
  )
}
