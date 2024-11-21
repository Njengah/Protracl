import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-customgreen p-8">
      <ul className="flex space-x-6 justify-center text-white">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </li>
        <li>
          <Link href="/register" className="hover:underline">
            Register
          </Link>
        </li>
        <li>
          <Link href="/tasks" className="hover:underline">
            Tasks
          </Link>
        </li>
        <li>
          <Link href="/forgot-password" className="hover:underline">
            Forgot Password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
