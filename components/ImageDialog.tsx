"use client";

import { useRef } from "react";

export function ImageDialog({
  src,
  alt,
  children
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="photo-button"
        type="button"
        onClick={() => dialogRef.current?.showModal()}
      >
        {children}
      </button>
      <dialog ref={dialogRef} onClick={() => dialogRef.current?.close()}>
        <img className="dialog-image" src={src} alt={alt} />
      </dialog>
    </>
  );
}
