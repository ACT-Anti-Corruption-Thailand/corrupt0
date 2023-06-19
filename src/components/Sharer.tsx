"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

let didInit = false;

export default function Sharer() {
  const [encodedURL, setEncodedURL] = useState("");

  useEffect(() => {
    if (!didInit && typeof window !== "undefined") {
      didInit = true;
      setEncodedURL(encodeURIComponent(window.location.href));
    }
  }, []);

  return (
    <>
      <a
        href={`http://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <Image
          className="w-20"
          src="/logos/share-fb.svg"
          width={20}
          height={20}
          alt="Facebook"
        />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedURL}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <Image
          className="w-20"
          src="/logos/share-tw.svg"
          width={20}
          height={20}
          alt="Twitter"
        />
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodedURL}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <Image
          className="w-20"
          src="/logos/share-line.svg"
          width={20}
          height={20}
          alt="Line messenger"
        />
      </a>
    </>
  );
}