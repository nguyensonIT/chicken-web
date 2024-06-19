import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

import {category} from "./components/DataCategory"
import Category from './components/Category';

const SideBar = () => {
    return (
        <div className="flex flex-col h-[100%] bg-bgSideBarColor">
            {/* Title */}
            <div className="flex items-center py-[8px] pl-[10px] bg-bgEmphasizeColor">
                <FontAwesomeIcon icon={faList} className="mr-[8px] text-textEmphasizeColor"/>
                <h1 className="font-bold text-textEmphasizeColor">Danh mục</h1>
            </div>
            {/* list  */}
            <div className="flex flex-col px-[10px] pt-[10px]">
                {
                    category.map((item, index)=>{
                        return(
                            <Category className={"py-[2px]"} key={index} icon={item.icon} href={item.href} name={item.name}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default SideBar