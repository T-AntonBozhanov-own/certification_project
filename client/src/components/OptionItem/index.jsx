import style from './optionItem.module.css'

export const OptionItem = ({title, handelClick}) => (
    <button className={style.question_item} onClick={handelClick}>{title}</button>
)