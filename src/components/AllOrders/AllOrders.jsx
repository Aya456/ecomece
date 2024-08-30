import { Link } from "react-router-dom";

export default function AllOrders() {
  return (
    <>
      <div className="bg-[#F8F9FA] w-3/4 mx-auto rounded-md my-6 md:h-[200px]">
        <div className="flex flex-wrap justify-center items-center py-20">
          <div className="space-y-3">
            <h1 className="md:text-[32px] text-[30px]">
              {" "}
              Your payment process is successful{" "}
              <i className="fa-solid fa-circle-check text-[#0891b2]"></i>
            </h1>
            
          </div>
        </div>
      </div>
    </>
  );
}