import Link from "next/link";

export default ({ loggedInUser }) => {
  const links = [
    loggedInUser && { label: "Sell Ticket", href: "/tickets/new" },
    loggedInUser && { label: "My orders", href: "/orders" },
    !loggedInUser && { label: "Sign Up", href: "/auth/signup" },
    !loggedInUser && { label: "Sign In", href: "/auth/signin" },
    loggedInUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">Zucker</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          <span>&nbsp;</span>
          {links}
          {loggedInUser && loggedInUser.email}
        </ul>
      </div>
    </nav>
  );
};
