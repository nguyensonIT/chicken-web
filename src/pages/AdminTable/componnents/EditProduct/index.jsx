import TableCreateDish from "../TableCreateDish";

const EditProduct = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-[60px] pb-[20px] px-[20px] bg-white shadow-lg rounded-lg overflow-hidden">
      <TableCreateDish data={data} />
    </div>
  );
};
export default EditProduct;
