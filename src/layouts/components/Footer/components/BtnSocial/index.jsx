const BtnSocial = ({ icon }) => {
  return (
    <button
      className="bg-white hover:bg-btnHoverColor hover:text-white transition-[2s] text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
      type="button"
    >
      {icon}
    </button>
  );
};
export default BtnSocial;
