import { OptionItem } from '../OptionItem'
import style from './options.module.css'

export const Options = ({options = [], onOptionSelect}) => (
    <div className={style.container}>
        <div className={style.options}>
            {
                options.map((item, index) => <OptionItem key={`${item}_${index}`} title={item} handelClick={() => onOptionSelect(index)}/>)
            }
        </div>
    </div>
)