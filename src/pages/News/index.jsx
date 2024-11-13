import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useHandleContext } from "../../contexts/UserProvider";
import WrapperStory from "./components/WrapperStory";

const News = () => {
  const { dataAllPostContext, dataIsLoadingContext } = useHandleContext();

  return (
    <div className="flex flex-col justify-center gap-[40px] pt-[60px] pb-[40px] mb-[-20px] bg-bgMainColor">
      {dataIsLoadingContext?.isLoadingPost && (
        <span className="w-full text-center">
          <FontAwesomeIcon className="loading" icon={faSpinner} />
        </span>
      )}
      {dataAllPostContext.length <= 0 && (
        <p className="w-full text-center">Hiện chưa có tin tức mới!</p>
      )}
      {dataAllPostContext.map((item, index) => {
        return <WrapperStory data={item} key={index} />;
      })}
    </div>
  );
};

export default News;
