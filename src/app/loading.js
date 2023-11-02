export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed w-screen m-auto h-screen flex justify-center items-center bg-white z-[1000]">
      <section id="global">
        <div id="top" className="mask">
          <div className="plane" />
        </div>
        <div id="middle" className="mask">
          <div className="plane" />
        </div>
        <div id="bottom" className="mask">
          <div className="plane" />
        </div>
        <p className="mt-4 loading">
          <i>LOADING...</i>
        </p>
      </section>
    </div>
  );
}
