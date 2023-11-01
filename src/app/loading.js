export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="fixed w-screen h-screen flex justify-center items-center bg-white z-[1000]">
            <div className="loader ">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
  }