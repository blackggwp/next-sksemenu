import useSWR from "swr";
import Image from "next/image";

export default function Test() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/readfiles", fetcher);

  return (
    <div>
      <main>
        <h1>Images read from API route: </h1>
        {!data && "Loading..."}
        {data &&
          data.map((imgPath, idx) => (
            <Image
              key={idx}
              src={imgPath}
              alt="Image alt"
              layout="responsive"
              width={0}
              height={0}
            />
          ))}
      </main>
    </div>
  );
}
