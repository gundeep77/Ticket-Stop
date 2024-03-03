import Link from "next/link";
const Header = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-heading">Ticket Stop</h1>
      {/* <h1 className='App-title'>Welcome to Ticket Stop</h1> */}
      <br />
      <br />
      <Link className="showlink" href="/">
        Home
      </Link>
      <Link className="showlink" href="/events/page/1">
        Events
      </Link>
      <Link className="showlink" href="/attractions/page/1">
        Attractions
      </Link>
      <Link className="showlink" href="/venues/page/1">
        Venues
      </Link>
    </header>
  </div>
);

export default Header;
