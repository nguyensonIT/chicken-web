import TableCreateDish from "../TableCreateDish";

const EditProduct = ({ data, handleClose }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-[60px] pb-[20px] px-[20px] bg-white shadow-lg rounded-lg overflow-hidden">
      <TableCreateDish data={data} handleClose={handleClose} />
    </div>
  );
};
export default EditProduct;
