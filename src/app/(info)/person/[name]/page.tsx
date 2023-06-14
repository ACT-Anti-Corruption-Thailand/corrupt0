export async function generateStaticParams() {
  return [{ name: "_test" }];
}

export default function Person() {
  return <div>Person</div>;
}
