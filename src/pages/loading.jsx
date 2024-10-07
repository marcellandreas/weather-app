import loading from "../assets/loading2.svg";

const Loading = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <div className="bg-cover">
        <img src={loading} alt="loading..." />
      </div>
    </section>
  );
};

export default Loading;
