import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { formatCurrency } from "../FormatCurrency"
import logo from "../../assets/img/Logo.png"
import "./index.css"

const CardProduct = ({ image, altImg = "image", name, desc, price, sale = "", onClick }) => {
    const priceParse = parseFloat(price)
    const priceProduct = formatCurrency(priceParse)

    const afterSaleProduct = () => {
        const saleParse = parseFloat(sale)

        const afterPriceSale = formatCurrency(priceParse - ((priceParse * saleParse) / 100))
        return afterPriceSale
    }

    return (
        <div onClick={onClick} className="card-wrap cursor-pointer border-transparent border-[2px] hover:border-textHoverColor hover:border-solid relative rounded-md grid grid-cols-3 gap-[8px] p-[12px] bg-white">
            <div className="image-product flex justify-center items-center relative col-span-1 overflow-hidden">
                <img className="w-[70px] h-[70px] rounded-md object-cover" src={image || logo} alt={altImg} />
            </div>
            <div className="content col-span-2 flex flex-col justify-between ">
                <h1 className="product-name overflow-ellipsis whitespace-nowrap overflow-hidden ">{name}</h1>
                <p className="desc italic text-[10px] overflow-ellipsis whitespace-nowrap overflow-hidden">{desc}</p>
                {sale ?
                    <div className="flex items-center">
                        <span className="mr-[2px] line-through text-[12px] opacity-30 italic">{priceProduct}</span>
                        <span className="mr-[8px] relative top-[-4px] line-through font-normal text-[10px] opacity-30 italic">đ</span>
                        <span className="text-[15px] font-normal">{afterSaleProduct()}</span>
                        <span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">đ</span>
                    </div>
                    : (<div className="flex items-center"><span className="text-[15px] font-normal">{priceProduct}</span><span className="mr-[8px] relative top-[-4px] font-normal text-[12px] italic">đ</span></div>)}
            </div>
            <button type="button" className="absolute hover:bg-btnHoverColor transition-[2s] flex justify-center items-center bg-btnColor text-[16px] text-[white] rounded-[50%] right-[12px] bottom-[12px] w-[22px] h-[22px]">
                <FontAwesomeIcon icon={faPlus} className="text-[12px]" />
            </button>
        </div>
    )
}
export default CardProduct 