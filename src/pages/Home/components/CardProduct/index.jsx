import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {FormatCurrency} from "../../../../components/FormatCurrency"
import logo from "../../../../assets/img/Logo.png"
import "./index.css"

const CardProduct = ({ image, altImg = "image", name, desc, price, sale = "" }) => {
    const priceParse = parseFloat(price)
    const priceProduct = FormatCurrency(priceParse)

    const saleProduct = () => {
        const saleParse = parseFloat(sale)

        const afterPriceSale = FormatCurrency(priceParse-((priceParse*saleParse)/100))
        return afterPriceSale
    }
    console.log(FormatCurrency(priceParse));
    return (
        <div className="card-wrap cursor-pointer border-transparent border-[2px] hover:border-textHoverColor hover:border-solid relative rounded-md grid grid-cols-3 gap-[8px] p-[12px] bg-white">
            <div className="image-product flex justify-center items-center relative col-span-1 overflow-hidden">
                <img className="w-[70px] h-[70px] rounded-md object-cover" src={image || logo} alt={altImg} />
            </div>
            <div className="content col-span-2 flex flex-col justify-between ">
                <h1 className="product-name overflow-ellipsis whitespace-nowrap overflow-hidden ">{name}</h1>
                <p className="desc text-[10px] overflow-ellipsis whitespace-nowrap overflow-hidden">{desc}</p>
                {sale ? <span className="line-through opacity-30 italic">{priceProduct}</span> : <span>{priceProduct}</span>}
                {sale && <span>{saleProduct()}</span>}
            </div>
            <button type="button" className="absolute hover:bg-btnHoverColor transition-[2s] flex justify-center items-center bg-btnColor text-[16px] text-[white] rounded-[50%] right-[12px] bottom-[12px] w-[22px] h-[22px]">
                <FontAwesomeIcon icon={faPlus} className="text-[12px]" />
            </button>
        </div>
    )
}
export default CardProduct 