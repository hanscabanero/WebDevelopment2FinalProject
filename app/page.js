import Link from 'next/link';

export default function Page()
{
  return (
    <main>
      <h1>CPRG306: Web Development 2 - Assignments</h1>
      <ul>
        <li>
          <Link href="/Budgeting">Go to budgeting</Link>
        </li> 
      </ul>
    </main>
  );
}