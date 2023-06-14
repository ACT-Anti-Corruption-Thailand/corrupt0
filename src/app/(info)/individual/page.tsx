import Link from "next/link";

export default function Individual() {
  return (
    <div>
      <div className="h4">Individual</div>
      <ul>
        <li>
          <Link href="person/_test">person/_test</Link>
        </li>
        <li>
          <Link href="business/_test">business/_test</Link>
        </li>
        <li>
          <Link href="party/_test">party/_test</Link>
        </li>
      </ul>
    </div>
  );
}
