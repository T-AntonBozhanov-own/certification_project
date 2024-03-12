import style from './optionItem.module.css'

export const OptionItem = ({title}) => (
    <button className={style.question_item}>{title}</button>
)