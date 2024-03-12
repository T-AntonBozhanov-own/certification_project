import { OptionItem } from '../OptionItem'
import style from './options.module.css'

export const Options = ({options = []}) => (
    <div className={style.container}>
        <button className={style.skip_btn}>Skip</button>
        <div className={style.options}>
            {
                    options.map(item => <OptionItem title={item.text}/>)
            }
        </div>
    </div>
)