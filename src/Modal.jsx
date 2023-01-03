import React from "react";

const Modal = (props) => {
  return (
    <>
      <button
        className="rounded-md shadow-md border text-medium my-2 text-base text-black border-blue-600 px-4 py-2 flex items-start justify-center"
        onClick={() => props.setShowModal(true)}>
        Add Node
      </button>
      {props.showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-4">
                <div className="flex items-end justify-end mb-2">
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => props.setShowModal(false)}>
                    <span className="text-black opacity-7 h-6 w-6 text-xl">
                      x
                    </span>
                  </button>
                </div>
                <div className="p-4">{props.children}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
